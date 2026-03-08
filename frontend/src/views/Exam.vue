<template>
  <div class="page-container">
    <h1 class="page-title">在线考试</h1>
    
    <div v-if="!examStarted" class="exam-list">
      <div v-for="exam in exams" :key="exam.id" class="exam-card">
        <div class="exam-info">
          <h3>{{ exam.title }}</h3>
          <p>{{ exam.questions }}道题 · {{ exam.duration }}分钟</p>
          <div class="exam-tags">
            <el-tag :type="exam.status === 'available' ? 'success' : 'info'" size="small">
              {{ exam.status === 'available' ? '可考试' : '已过期' }}
            </el-tag>
            <el-tag v-if="exam.completed" type="success" size="small">已完成</el-tag>
            <el-tag v-if="exam.completed" type="warning" size="small">得分：{{ exam.score }}分</el-tag>
          </div>
        </div>
        <el-button v-if="exam.status === 'available' && !exam.completed" type="primary" @click="startExam(exam)">
          开始考试
        </el-button>
        <el-button v-else-if="exam.completed" @click="viewResult(exam)">
          查看成绩
        </el-button>
        <el-button v-else disabled>不可用</el-button>
      </div>
    </div>
    
    <div v-else class="exam-paper">
      <div class="paper-header">
        <h2>{{ currentExam.title }}</h2>
        <div class="timer">
          <el-icon><Timer /></el-icon>
          剩余时间：{{ formatTime(timeLeft) }}
        </div>
      </div>
      
      <div class="questions">
        <div v-for="(q, index) in currentExam.questions" :key="q.id" class="question-item">
          <div class="question-header">
            <span class="question-number">{{ index + 1 }}.</span>
            <span class="question-text">{{ q.question }}</span>
            <el-tag size="small" :type="q.type === 'single' ? 'primary' : 'success'">
              {{ q.type === 'single' ? '单选' : '多选' }}
            </el-tag>
          </div>
          <el-radio-group v-if="q.type === 'single'" v-model="answers[q.id]" class="options">
            <el-radio v-for="(opt, i) in q.options" :key="i" :label="String.fromCharCode(65 + i)" style="display: block; margin: 8px 0;">
              {{ String.fromCharCode(65 + i) }}. {{ opt }}
            </el-radio>
          </el-radio-group>
          <el-checkbox-group v-else v-model="answers[q.id]" class="options">
            <el-checkbox v-for="(opt, i) in q.options" :key="i" :label="String.fromCharCode(65 + i)" style="display: block; margin: 8px 0;">
              {{ String.fromCharCode(65 + i) }}. {{ opt }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      
      <div class="paper-footer">
        <el-button @click="examStarted = false">取消</el-button>
        <el-button type="primary" @click="submitExam">提交试卷</el-button>
      </div>
    </div>
    
    <el-dialog v-model="resultVisible" title="考试成绩" width="400px">
      <div class="result-content">
        <div class="score-circle">
          <span class="score">{{ result.score }}</span>
          <span class="label">分</span>
        </div>
        <p>正确题数：{{ result.correct }} / {{ result.total }}</p>
        <el-button type="primary" @click="resultVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import { exams } from '../api'
import { ElMessage } from 'element-plus'

const examList = ref([])
const examStarted = ref(false)
const currentExam = ref(null)
const timeLeft = ref(0)
const answers = ref({})
const resultVisible = ref(false)
const result = ref({})
let timer = null

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const loadExams = async () => {
  try {
    const { data } = await exams.list()
    examList.value = data.list
  } catch (err) {
    console.error(err)
  }
}

const startExam = async (exam) => {
  try {
    const { data } = await exams.get(exam.id)
    currentExam.value = data
    timeLeft.value = data.questions.length * 90
    answers.value = {}
    examStarted.value = true
    
    timer = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        submitExam()
      }
    }, 1000)
  } catch (err) {
    ElMessage.error('加载考试失败')
  }
}

const submitExam = async () => {
  if (timer) clearInterval(timer)
  
  try {
    const { data } = await exams.submit(currentExam.value.id, { answers: answers.value })
    result.value = data
    resultVisible.value = true
    examStarted.value = false
    loadExams()
  } catch (err) {
    ElMessage.error('提交失败')
  }
}

const viewResult = (exam) => {
  result.value = { score: exam.score, correct: Math.floor(exam.score / 10), total: 4 }
  resultVisible.value = true
}

onMounted(() => loadExams())
onUnmounted(() => timer && clearInterval(timer))
</script>

<style scoped>
.exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exam-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.exam-info h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.exam-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.exam-tags {
  display: flex;
  gap: 8px;
}

.exam-paper {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.paper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.timer {
  font-size: 18px;
  color: #f57c00;
  display: flex;
  align-items: center;
  gap: 8px;
}

.question-item {
  margin-bottom: 32px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
}

.question-number {
  font-weight: 600;
  color: #1a73e8;
}

.question-text {
  flex: 1;
  font-size: 15px;
}

.options {
  padding-left: 24px;
}

.paper-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.result-content {
  text-align: center;
  padding: 20px;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.score-circle .score {
  font-size: 40px;
  font-weight: bold;
}

.result-content p {
  margin-bottom: 20px;
  color: #666;
}
</style>
