const express = require('express')
const router = express.Router()

const exams = [
  { id: 1, title: '廉政知识测试（一）', questions: 20, duration: 30, status: 'available', completed: false },
  { id: 2, title: '党纪法规学习测试', questions: 30, duration: 45, status: 'available', completed: true, score: 85 },
  { id: 3, title: '廉洁从业规范考核', questions: 25, duration: 40, status: 'available', completed: false },
  { id: 4, title: '廉政风险防控测试', questions: 20, duration: 30, status: 'expired', completed: false }
]

router.get('/list', (req, res) => {
  res.json({ list: exams })
})

router.get('/:id', (req, res) => {
  const exam = exams.find(e => e.id === parseInt(req.params.id))
  if (exam) {
    res.json({
      id: exam.id,
      title: exam.title,
      questions: [
        { id: 1, type: 'single', question: '中国共产党纪律处分条例适用于哪些对象？', options: ['党员', '公务员', '所有公职人员', '党组织和党员'], answer: 'D' },
        { id: 2, type: 'single', question: '廉洁自律准则要求党员领导干部要做到的包括？', options: ['廉洁从政', '廉洁用权', '廉洁修身', '以上都是'], answer: 'D' },
        { id: 3, type: 'multiple', question: '下列属于廉政风险防控重点领域的是？', options: ['工程建设', '政府采购', '人事任免', '财务管理'], answer: ['A', 'B', 'C', 'D'] },
        { id: 4, type: 'single', question: '落实中央八项规定精神，重点纠正的不良风气包括？', options: ['形式主义', '官僚主义', '享乐主义', '以上都是'], answer: 'D' },
        { id: 5, type: 'single', question: '监督执纪"四种形态"不包括？', options: ['经常开展批评和自我批评', '党纪轻处分', '开除党籍', '严重违纪涉嫌违法立案审查'], answer: 'C' }
      ]
    })
  } else {
    res.status(404).json({ message: '考试不存在' })
  }
})

router.post('/:id/submit', (req, res) => {
  const score = Math.floor(Math.random() * 30) + 70
  res.json({ success: true, score, correct: Math.floor(score / 10), total: 5 })
})

module.exports = router
