<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">政策法规</h1>
      <el-input v-model="search" placeholder="搜索文章..." style="width: 300px" :prefix-icon="Search" @input="handleSearch" />
    </div>
    
    <div class="category-tabs">
      <el-radio-group v-model="category" @change="loadArticles">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="policy">政策法规</el-radio-button>
        <el-radio-button label="news">工作动态</el-radio-button>
        <el-radio-button label="case">典型案例</el-radio-button>
        <el-radio-button label="theory">理论研究</el-radio-button>
      </el-radio-group>
    </div>
    
    <div class="articles-grid">
      <div v-for="article in list" :key="article.id" class="article-card" @click="viewArticle(article)">
        <div class="article-category">
          <el-tag size="small" :type="getCategoryType(article.category)">{{ article.categoryName }}</el-tag>
        </div>
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-summary">{{ article.summary }}</p>
        <div class="article-footer">
          <span class="author">{{ article.author }}</span>
          <span class="date">{{ article.date }}</span>
          <span class="views"><el-icon><View /></el-icon> {{ article.views }}</span>
        </div>
      </div>
    </div>
    
    <el-dialog v-model="dialogVisible" :title="currentArticle?.title" width="60%">
      <div class="article-content">
        <div class="content-header">
          <el-tag :type="getCategoryType(currentArticle?.category)">{{ currentArticle?.categoryName }}</el-tag>
          <span class="author">作者：{{ currentArticle?.author }}</span>
          <span class="date">{{ currentArticle?.date }}</span>
        </div>
        <p class="content-body">{{ currentArticle?.summary }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, View } from '@element-plus/icons-vue'
import { articles } from '../api'

const search = ref('')
const category = ref('')
const list = ref([])
const dialogVisible = ref(false)
const currentArticle = ref(null)

const getCategoryType = (cat) => {
  const types = { policy: 'danger', news: 'success', case: 'warning', theory: '' }
  return types[cat] || ''
}

const loadArticles = async () => {
  try {
    const { data } = await articles.list({ category: category.value, search: search.value })
    list.value = data.list
  } catch (err) {
    console.error(err)
  }
}

const handleSearch = () => {
  loadArticles()
}

const viewArticle = (article) => {
  currentArticle.value = article
  dialogVisible.value = true
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.category-tabs {
  margin-bottom: 20px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.article-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.article-category {
  margin-bottom: 12px;
}

.article-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.5;
}

.article-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.article-footer .views {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.content-body {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
}
</style>
