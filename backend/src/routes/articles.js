const express = require('express')
const router = express.Router()

const articles = [
  { id: 1, title: '中国共产党纪律处分条例解读', summary: '深入学习《中国共产党纪律处分条例》，加强廉政建设。', category: 'policy', categoryName: '政策法规', author: '纪委办公室', date: '2026-03-05', views: 234 },
  { id: 2, title: '全省高校廉政教育工作座谈会召开', summary: '近日，全省高校廉政教育工作座谈会在兰州召开。', category: 'news', categoryName: '工作动态', author: '宣传部', date: '2026-03-03', views: 189 },
  { id: 3, title: '警示教育：违反中央八项规定精神典型案例', summary: '通报多起违反中央八项规定精神的典型案例。', category: 'case', categoryName: '典型案例', author: '监察室', date: '2026-03-01', views: 312 },
  { id: 4, title: '新时代廉洁文化建设的理论与实践', summary: '探讨新时代背景下廉洁文化建设的路径和方法。', category: 'theory', categoryName: '理论研究', author: '科研处', date: '2026-02-28', views: 156 },
  { id: 5, title: '廉政谈话制度实施细则', summary: '关于进一步规范廉政谈话工作的实施细则。', category: 'policy', categoryName: '政策法规', author: '纪委办公室', date: '2026-02-25', views: 98 },
  { id: 6, title: '我校开展廉政风险点排查工作', summary: '全面排查各岗位廉政风险点，建立健全防控机制。', category: 'news', categoryName: '工作动态', author: '监察室', date: '2026-02-20', views: 145 }
]

router.get('/', (req, res) => {
  const { category, search } = req.query
  let result = articles
  
  if (category) {
    result = result.filter(a => a.category === category)
  }
  if (search) {
    result = result.filter(a => a.title.includes(search) || a.summary.includes(search))
  }
  
  res.json({ list: result, total: result.length })
})

router.get('/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id))
  if (article) {
    res.json(article)
  } else {
    res.status(404).json({ message: '文章不存在' })
  }
})

module.exports = router
