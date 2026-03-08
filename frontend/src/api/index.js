import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  current: () => api.get('/auth/current')
}

export const articles = {
  list: (params) => api.get('/articles', { params }),
  get: (id) => api.get(`/articles/${id}`)
}

export const exams = {
  list: () => api.get('/exams/list'),
  get: (id) => api.get(`/exams/${id}`),
  submit: (id, data) => api.post(`/exams/${id}/submit`, data)
}

export const admin = {
  stats: () => api.get('/admin/stats'),
  users: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  articles: () => api.get('/admin/articles'),
  createArticle: (data) => api.post('/admin/articles', data),
  updateArticle: (id, data) => api.put(`/admin/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/admin/articles/${id}`)
}

export default api
