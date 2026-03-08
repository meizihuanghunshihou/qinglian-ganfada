<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
        <h2>管理后台</h2>
        <p>清廉甘法大</p>
      </div>
      <nav class="nav">
        <router-link to="/admin/dashboard" class="nav-item" :class="{ active: route.path === '/admin/dashboard' }">
          <el-icon><HomeFilled /></el-icon>
          <span>控制台</span>
        </router-link>
        <router-link to="/admin/articles" class="nav-item" :class="{ active: route.path === '/admin/articles' }">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </router-link>
        <router-link to="/admin/users" class="nav-item" :class="{ active: route.path === '/admin/users' }">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <el-button type="primary" size="small" @click="router.push('/dashboard')">
          返回用户端
        </el-button>
        <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
      </div>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { HomeFilled, Document, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

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
  width: 220px;
  background: #2c3e50;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.logo {
  padding: 24px 20px;
  text-align: center;
  background: #1a252f;
}

.logo h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.logo p {
  font-size: 12px;
  opacity: 0.7;
}

.nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s;
  gap: 12px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background: #34495e;
  color: #fff;
  border-left: 3px solid #3498db;
}

.sidebar-footer {
  padding: 20px;
  display: flex;
  gap: 10px;
}

.main {
  flex: 1;
  margin-left: 220px;
  background: #f5f7fa;
  min-height: 100vh;
}
</style>
