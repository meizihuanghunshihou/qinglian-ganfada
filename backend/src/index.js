const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

let pool

async function initDB() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qinglian',
    waitForConnections: true,
    connectionLimit: 10
  })
  
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100),
      role ENUM('admin', 'user') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      summary TEXT,
      content TEXT,
      category VARCHAR(50),
      author VARCHAR(100),
      views INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS exams (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      questions INT DEFAULT 0,
      duration INT DEFAULT 30,
      status VARCHAR(20) DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS exam_results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      exam_id INT,
      score INT,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (exam_id) REFERENCES exams(id)
    )
  `)
  
  const [rows] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE username = ?', ['admin'])
  if (rows[0].count === 0) {
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await pool.execute('INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)', 
      ['admin', hashedPassword, '系统管理员', 'admin'])
    console.log('Admin user created')
  }
  
  const [articles] = await pool.execute('SELECT COUNT(*) as count FROM articles')
  if (articles[0].count === 0) {
    await pool.execute(`INSERT INTO articles (title, summary, content, category, author) VALUES 
      (?, ?, ?, ?, ?)`,
      ['中国共产党纪律处分条例解读', '深入学习《中国共产党纪律处分条例》，加强廉政建设。', '详细内容...', 'policy', '纪委办公室'])
    await pool.execute(`INSERT INTO articles (title, summary, content, category, author) VALUES 
      (?, ?, ?, ?, ?)`,
      ['全省高校廉政教育工作座谈会召开', '近日，全省高校廉政教育工作座谈会在兰州召开。', '详细内容...', 'news', '宣传部'])
    await pool.execute(`INSERT INTO articles (title, summary, content, category, author) VALUES 
      (?, ?, ?, ?, ?)`,
      ['警示教育：违反中央八项规定精神典型案例', '通报多起违反中央八项规定精神的典型案例。', '详细内容...', 'case', '监察室'])
    console.log('Sample articles created')
  }
  
  console.log('Database initialized')
}

const authRoutes = require('./routes/auth')
const articleRoutes = require('./routes/articles')
const examRoutes = require('./routes/exams')
const adminRoutes = require('./routes/admin')

app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, async () => {
  try {
    await initDB()
    console.log(`Server running on http://localhost:${PORT}`)
  } catch (err) {
    console.error('DB init failed:', err.message)
    console.log('Running without database...')
    console.log(`Server running on http://localhost:${PORT}`)
  }
})
