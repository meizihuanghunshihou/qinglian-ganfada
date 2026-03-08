<template>
  <div class="page-container">
    <h1 class="page-title">学习统计</h1>
    
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e3f2fd;">
          <el-icon color="#1a73e8" :size="28"><TrendCharts /></el-icon>
        </div>
        <div class="stat-value">{{ stats.rank }}</div>
        <div class="stat-label">当前排名</div>
        <div class="stat-desc">共 {{ stats.totalUsers }} 人</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e8f5e9;">
          <el-icon color="#34a853" :size="28"><Calendar /></el-icon>
        </div>
        <div class="stat-value">{{ stats.streak }}</div>
        <div class="stat-label">连续学习(天)</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fff3e0;">
          <el-icon color="#f57c00" :size="28"><EditPen /></el-icon>
        </div>
        <div class="stat-value">{{ stats.totalExams }}</div>
        <div class="stat-label">完成考试</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fce4ec;">
          <el-icon color="#e91e63" :size="28"><Star /></el-icon>
        </div>
        <div class="stat-value">{{ stats.avgScore }}</div>
        <div class="stat-label">平均成绩</div>
      </div>
    </div>
    
    <div class="content-grid">
      <div class="card">
        <h3 class="card-title">最近成绩</h3>
        <el-table :data="recentScores" style="width: 100%">
          <el-table-column prop="title" label="考试名称" />
          <el-table-column prop="score" label="分数" width="100">
            <template #default="{ row }">
              <el-tag :type="row.score >= 90 ? 'success' : row.score >= 60 ? 'warning' : 'danger'">
                {{ row.score }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="考试时间" width="120" />
        </el-table>
      </div>
      
      <div class="card">
        <h3 class="card-title">成绩分布</h3>
        <div class="chart-placeholder">
          <div class="bar-chart">
            <div v-for="item in scoreDist" :key="item.range" class="bar-item">
              <div class="bar" :style="{ height: item.count * 2 + 'px' }"></div>
              <span class="bar-label">{{ item.range }}</span>
              <span class="bar-count">{{ item.count }}人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TrendCharts, Calendar, EditPen, Star } from '@element-plus/icons-vue'

const stats = ref({
  totalExams: 12,
  avgScore: 88.5,
  totalUsers: 892,
  rank: 45,
  streak: 15
})

const recentScores = ref([
  { title: '党纪法规学习测试', score: 85, date: '2026-03-01' },
  { title: '廉政知识入门测试', score: 92, date: '2026-02-15' },
  { title: '廉洁从业规范考核', score: 88, date: '2026-02-01' }
])

const scoreDist = ref([
  { range: '90-100', count: 320 },
  { range: '80-89', count: 280 },
  { range: '70-79', count: 165 },
  { range: '60-69', count: 85 },
  { range: '60以下', count: 42 }
])
</script>

<style scoped>
.stat-desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.card-title {
  font-size: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.chart-placeholder {
  height: 250px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
}

.bar-chart {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 40px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}

.bar-label {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.bar-count {
  font-size: 11px;
  color: #999;
}
</style>
