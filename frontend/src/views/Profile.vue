<template>
  <div class="page-container">
    <h1 class="page-title">个人中心</h1>
    
    <div class="profile-card">
      <div class="avatar-section">
        <el-avatar :size="100" style="font-size: 40px;">
          {{ user?.name?.[0] || 'U' }}
        </el-avatar>
        <el-button type="primary" size="small" style="margin-top: 12px;">更换头像</el-button>
      </div>
      
      <div class="info-section">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" disabled />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="角色">
            <el-tag :type="user?.role === 'admin' ? 'danger' : 'primary'">
              {{ user?.role === 'admin' ? '管理员' : '学员' }}
            </el-tag>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input :value="'2026-01-01'" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveProfile">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    <div class="card" style="margin-top: 20px;">
      <h3 class="card-title">修改密码</h3>
      <el-form :model="passwordForm" label-width="100px" style="max-width: 400px;">
        <el-form-item label="原密码">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const user = computed(() => JSON.parse(localStorage.getItem('user') || '{}'))

const form = reactive({
  username: user.value.username || '',
  name: user.value.name || ''
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const saveProfile = () => {
  ElMessage.success('保存成功')
}

const changePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    ElMessage.error('两次密码输入不一致')
    return
  }
  ElMessage.success('密码修改成功')
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}
</script>

<style scoped>
.profile-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  gap: 48px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-section {
  flex: 1;
}

.card-title {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
