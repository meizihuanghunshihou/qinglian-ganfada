<template>
  <div class="page-container">
    <h1 class="page-title">在线学习</h1>
    
    <div class="study-cards">
      <div class="study-card" @click="startStudy('policy')">
        <div class="card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <el-icon :size="32"><Reading /></el-icon>
        </div>
        <h3>党纪法规</h3>
        <p>学习中国共产党纪律处分条例等重要法规</p>
        <el-progress :percentage="75" :show-text="false" />
        <span class="progress-text">已学习 75%</span>
      </div>
      
      <div class="study-card" @click="startStudy('case')">
        <div class="card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <el-icon :size="32"><Warning /></el-icon>
        </div>
        <h3>警示教育</h3>
        <p>通过典型案例进行警示教育</p>
        <el-progress :percentage="60" :show-text="false" color="#f5576c" />
        <span class="progress-text">已学习 60%</span>
      </div>
      
      <div class="study-card" @click="startStudy('theory')">
        <div class="card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <el-icon :size="32"><School /></el-icon>
        </div>
        <h3>理论研究</h3>
        <p>深入学习廉洁文化建设的理论</p>
        <el-progress :percentage="45" :show-text="false" color="#00f2fe" />
        <span class="progress-text">已学习 45%</span>
      </div>
      
      <div class="study-card" @click="startStudy('video')">
        <div class="card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
          <el-icon :size="32"><VideoCamera /></el-icon>
        </div>
        <h3>视频学习</h3>
        <p>观看廉政教育专题视频</p>
        <el-progress :percentage="30" :show-text="false" color="#38f9d7" />
        <span class="progress-text">已学习 30%</span>
      </div>
    </div>
    
    <div class="card" style="margin-top: 20px;">
      <h3 class="card-title">学习记录</h3>
      <el-timeline>
        <el-timeline-item v-for="item in records" :key="item.id" :timestamp="item.date" placement="top">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>学习时长：{{ item.duration }}分钟</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Reading, Warning, School, VideoCamera } from '@element-plus/icons-vue'

const router = useRouter()

const startStudy = (type) => {
  router.push(`/articles?category=${type}`)
}

const records = ref([
  { id: 1, title: '学习《中国共产党纪律处分条例》', date: '2026-03-05', duration: 45 },
  { id: 2, title: '观看警示教育片', date: '2026-03-03', duration: 60 },
  { id: 3, title: '阅读典型案例分析', date: '2026-03-01', duration: 30 }
])
</script>

<style scoped>
.study-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.study-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
}

.study-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 16px;
}

.study-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.study-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.progress-text {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  display: block;
}

.card-title {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
