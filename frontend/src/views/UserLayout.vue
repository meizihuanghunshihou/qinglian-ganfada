<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
        <h2>清廉甘法大</h2>
        <p>廉政教育平台</p>
      </div>
      <nav class="nav">
        <router-link to="/dashboard" class="nav-item" :class="{ active: route.path === '/dashboard' }">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </router-link>
        <router-link to="/articles" class="nav-item" :class="{ active: route.path === '/articles' }">
          <el-icon><Document /></el-icon>
          <span>政策法规</span>
        </router-link>
        <router-link to="/study" class="nav-item" :class="{ active: route.path === '/study' }">
          <el-icon><Reading /></el-icon>
          <span>在线学习</span>
        </router-link>
        <router-link to="/exam" class="nav-item" :class="{ active: route.path === '/exam' }">
          <el-icon><EditPen /></el-icon>
          <span>在线考试</span>
        </router-link>
        <router-link to="/statistics" class="nav-item" :class="{ active: route.path === '/statistics' }">
          <el-icon><DataAnalysis /></el-icon>
          <span>学习统计</span>
        </router-link>
        <router-link to="/profile" class="nav-item" :class="{ active: route.path === '/profile' }">
          <el-icon><User /></el-icon>
          <span>个人中心</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <div class="user-info">
          <el-avatar :size="36">{{ user?.name?.[0] || 'U' }}</el-avatar>
          <div class="user-detail">
            <span class="name">{{ user?.name || '用户' }}</span>
            <span class="role">{{ user?.role === 'admin' ? '管理员' : '学员' }}</span>
          </div>
        </div>
        <el-button type="danger" size="small" @click="handleLogout">退出</el-button>
      </div>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeFilled, Document, Reading, EditPen, DataAnalysis, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const user = computed(() => JSON.parse(localStorage.getItem('user') || '{}'))

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #1a73e8 0%, #1557b0 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.logo {
  padding: 24px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.logo p {
  font-size: 12px;
  opacity: 0.8;
}

.nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  gap: 12px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-left: 3px solid #fff;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-detail {
  display: flex;
  flex-direction: column;
}

.user-detail .name {
  font-size: 14px;
}

.user-detail .role {
  font-size: 12px;
  opacity: 0.7;
}

.main {
  flex: 1;
  margin-left: 240px;
  background: #f5f7fa;
  min-height: 100vh;
}
</style>
