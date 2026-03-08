const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'qinglian-secret-key-2026'

const getPool = () => {
  const db = require('../index.js')
  return null
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  
  if (!username || !password) {
    return res.status(400).json({ message: '请输入用户名和密码' })
  }
  
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 1, username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({
      token,
      user: { id: 1, username: 'admin', name: '系统管理员', role: 'admin' }
    })
  }
  
  if (username && password) {
    const token = jwt.sign({ id: 2, username, role: 'user' }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({
      token,
      user: { id: 2, username, name: username, role: 'user' }
    })
  }
  
  res.status(401).json({ message: '用户名或密码错误' })
})

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body
  
  if (!username || !password) {
    return res.status(400).json({ message: '请填写完整信息' })
  }
  
  const token = jwt.sign({ id: Date.now(), username, role: 'user' }, JWT_SECRET, { expiresIn: '7d' })
  res.json({
    token,
    user: { id: Date.now(), username, name: name || username, role: 'user' }
  })
})

router.get('/current', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: '未登录' })
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ user: decoded })
  } catch {
    res.status(401).json({ message: '无效的令牌' })
  }
})

module.exports = router
