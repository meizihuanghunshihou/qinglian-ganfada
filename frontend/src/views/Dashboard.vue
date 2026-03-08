<template>
  <div class="page-container">
    <div class="welcome-card">
      <h1>欢迎回来，{{ user?.name || '学员' }}！</h1>
      <p>每天学习一点点，廉洁自律记心间</p>
    </div>
    
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e8f5e9;">
          <el-icon color="#34a853"><Document /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalArticles }}</div>
        <div class="stat-label">政策法规</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e3f2fd;">
          <el-icon color="#1a73e8"><Reading /></el-icon>
        </div>
        <div class="stat-value">{{ stats.learningHours }}</div>
        <div class="stat-label">学习时长(小时)</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fff3e0;">
          <el-icon color="#f57c00"><EditPen /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalExams }}</div>
        <div class="stat-label">已完成考试</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fce4ec;">
          <el-icon color="#e91e63"><TrendCharts /></el-icon>
        </div>
        <div class="stat-value">{{ stats.avgScore }}分</div>
        <div class="stat-label">平均成绩</div>
      </div>
    </div>
    
    <div class="content-grid">
      <div class="card">
        <h3 class="card-title">最新文章</h3>
        <div class="article-list">
          <div v-for="article in articles" :key="article.id" class="article-item" @click="goToArticle(article.id)">
            <div class="article-info">
              <span class="article-title">{{ article.title }}</span>
              <span class="article-meta">{{ article.author }} · {{ article.date }}</span>
            </div>
            <el-tag size="small">{{ article.categoryName }}</el-tag>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">最近考试</h3>
        <div class="exam-list">
          <div v-for="exam in exams" :key="exam.id" class="exam-item" @click="goToExam(exam.id)">
            <div class="exam-info">
              <span class="exam-title">{{ exam.title }}</span>
              <span class="exam-meta">{{ exam.questions }}题 · {{ exam.duration }}分钟</span>
            </div>
            <el-tag :type="exam.completed ? 'success' : 'primary'" size="small">
              {{ exam.completed ? `已考 ${exam.score}分` : '未考' }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Document, Reading, EditPen, TrendCharts } from '@element-plus/icons-vue'
import { articles, exams } from '../api'

const router = useRouter()

const user = computed(() => JSON.parse(localStorage.getItem('user') || '{}'))

const stats = ref({
  totalArticles: 156,
  learningHours: 36,
  totalExams: 12,
  avgScore: 88.5
})

const articleList = ref([])
const examList = ref([])

onMounted(async () => {
  try {
    const [articlesRes, examsRes] = await Promise.all([
      articles.list(),
      exams.list()
    ])
    articleList.value = articlesRes.data.list.slice(0, 5)
    examList.value = examsRes.data.list.slice(0, 4)
  } catch (err) {
    console.error(err)
  }
})

const articles = computed(() => articleList.value)
const exams = computed(() => examList.value)

const goToArticle = (id) => router.push(`/articles?id=${id}`)
const goToExam = (id) => router.push(`/exam?id=${id}`)
</script>

<style scoped>
.welcome-card {
  background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
  color: #fff;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.welcome-card h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.welcome-card p {
  opacity: 0.9;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card-title {
  font-size: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.article-item, .exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

.article-item:hover, .exam-item:hover {
  padding-left: 8px;
  background: #fafafa;
}

.article-info, .exam-info {
  display: flex;
  flex-direction: column;
}

.article-title, .exam-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.article-meta, .exam-meta {
  font-size: 12px;
  color: #999;
}
</style>
