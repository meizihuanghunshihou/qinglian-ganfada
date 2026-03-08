const express = require('express')
const router = express.Router()

router.get('/stats', (req, res) => {
  res.json({
    totalUsers: 1256,
    activeUsers: 892,
    totalArticles: 156,
    totalExams: 24,
    avgScore: 86.5,
    completionRate: 78.5,
    monthlyData: [
      { month: '9月', users: 120, exams: 180 },
      { month: '10月', users: 145, exams: 210 },
      { month: '11月', users: 168, exams: 256 },
      { month: '12月', users: 195, exams: 298 },
      { month: '1月', users: 210, exams: 320 },
      { month: '2月', users: 245, exams: 380 }
    ]
  })
})

router.get('/users', (req, res) => {
  res.json({
    list: [
      { id: 1, username: 'admin', name: '系统管理员', role: 'admin', created_at: '2026-01-01' },
      { id: 2, username: 'zhangsan', name: '张三', role: 'user', created_at: '2026-01-15' },
      { id: 3, username: 'lisi', name: '李四', role: 'user', created_at: '2026-02-01' }
    ]
  })
})

router.post('/users', (req, res) => {
  res.json({ message: '用户创建成功', id: Date.now() })
})

router.delete('/users/:id', (req, res) => {
  res.json({ message: '用户删除成功' })
})

router.get('/articles', (req, res) => {
  res.json({
    list: [
      { id: 1, title: '中国共产党纪律处分条例解读', category: '政策法规', author: '纪委办公室', views: 234, created_at: '2026-03-05' },
      { id: 2, title: '全省高校廉政教育工作座谈会召开', category: '工作动态', author: '宣传部', views: 189, created_at: '2026-03-03' },
      { id: 3, title: '警示教育：违反中央八项规定精神典型案例', category: '典型案例', author: '监察室', views: 312, created_at: '2026-03-01' }
    ]
  })
})

router.post('/articles', (req, res) => {
  res.json({ message: '文章创建成功', id: Date.now() })
})

router.put('/articles/:id', (req, res) => {
  res.json({ message: '文章更新成功' })
})

router.delete('/articles/:id', (req, res) => {
  res.json({ message: '文章删除成功' })
})

module.exports = router
