<template>
  <div class="page-container">
    <h1 class="page-title">控制台</h1>
    
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e3f2fd;">
          <el-icon color="#1a73e8" :size="28"><User /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalUsers }}</div>
        <div class="stat-label">用户总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e8f5e9;">
          <el-icon color="#34a853" :size="28"><UserFilled /></el-icon>
        </div>
        <div class="stat-value">{{ stats.activeUsers }}</div>
        <div class="stat-label">活跃用户</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fff3e0;">
          <el-icon color="#f57c00" :size="28"><Document /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalArticles }}</div>
        <div class="stat-label">文章总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fce4ec;">
          <el-icon color="#e91e63" :size="28"><EditPen /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalExams }}</div>
        <div class="stat-label">考试总数</div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">月度数据趋势</h3>
      <div class="chart">
        <div class="chart-bars">
          <div v-for="item in stats.monthlyData" :key="item.month" class="chart-bar">
            <div class="bar-group">
              <div class="bar users" :style="{ height: item.users * 1.5 + 'px' }" :title="'用户: ' + item.users"></div>
              <div class="bar exams" :style="{ height: item.exams * 0.8 + 'px' }" :title="'考试: ' + item.exams"></div>
            </div>
            <span class="bar-label">{{ item.month }}</span>
          </div>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot" style="background: #1a73e8;"></span> 用户</span>
          <span class="legend-item"><span class="dot" style="background: #34a853;"></span> 考试</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { User, UserFilled, Document, EditPen } from '@element-plus/icons-vue'
import { admin } from '../api'

const stats = ref({
  totalUsers: 1256,
  activeUsers: 892,
  totalArticles: 156,
  totalExams: 24,
  monthlyData: []
})

onMounted(async () => {
  try {
    const { data } = await admin.stats()
    stats.value.monthlyData = data.monthlyData
  } catch (err) {
    stats.value.monthlyData = [
      { month: '9月', users: 120, exams: 180 },
      { month: '10月', users: 145, exams: 210 },
      { month: '11月', users: 168, exams: 256 },
      { month: '12月', users: 195, exams: 298 },
      { month: '1月', users: 210, exams: 320 },
      { month: '2月', users: 245, exams: 380 }
    ]
  }
})
</script>

<style scoped>
.card-title {
  font-size: 16px;
  margin-bottom: 20px;
}

.chart {
  height: 300px;
  padding: 20px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 250px;
  border-bottom: 1px solid #eee;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-group {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 200px;
}

.bar {
  width: 24px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}

.bar.users {
  background: #1a73e8;
}

.bar.exams {
  background: #34a853;
}

.bar-label {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
