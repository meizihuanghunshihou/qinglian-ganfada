<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">文章管理</h1>
      <el-button type="primary" @click="showDialog = true">
        <el-icon><Plus /></el-icon> 添加文章
      </el-button>
    </div>
    
    <div class="card">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag>{{ getCategoryName(row.category) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="views" label="浏览量" width="80" />
        <el-table-column prop="created_at" label="发布时间" width="120" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="editArticle(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteArticle(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-dialog v-model="showDialog" :title="isEdit ? '编辑文章' : '添加文章'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" style="width: 100%;">
            <el-option label="政策法规" value="policy" />
            <el-option label="工作动态" value="news" />
            <el-option label="典型案例" value="case" />
            <el-option label="理论研究" value="theory" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" :rows="6" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="saveArticle">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { admin } from '../api'

const list = ref([])
const showDialog = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null,
  title: '',
  category: 'policy',
  author: '',
  summary: '',
  content: ''
})

const getCategoryName = (cat) => {
  const names = { policy: '政策法规', news: '工作动态', case: '典型案例', theory: '理论研究' }
  return names[cat] || cat
}

const loadArticles = async () => {
  try {
    const { data } = await admin.articles()
    list.value = data.list
  } catch (err) {
    console.error(err)
  }
}

const editArticle = (row) => {
  Object.assign(form, row)
  isEdit.value = true
  showDialog.value = true
}

const deleteArticle = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除这篇文章吗？', '提示', { type: 'warning' })
    await admin.deleteArticle(row.id)
    ElMessage.success('删除成功')
    loadArticles()
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败')
  }
}

const saveArticle = async () => {
  try {
    if (isEdit.value) {
      await admin.updateArticle(form.id, form)
      ElMessage.success('更新成功')
    } else {
      await admin.createArticle(form)
      ElMessage.success('创建成功')
    }
    showDialog.value = false
    loadArticles()
    resetForm()
  } catch (err) {
    ElMessage.error('操作失败')
  }
}

const resetForm = () => {
  Object.assign(form, { id: null, title: '', category: 'policy', author: '', summary: '', content: '' })
  isEdit.value = false
}

onMounted(() => loadArticles())
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
