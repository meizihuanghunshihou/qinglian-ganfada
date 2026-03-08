import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import UserLayout from '../views/UserLayout.vue'
import AdminLayout from '../views/AdminLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Articles from '../views/Articles.vue'
import Study from '../views/Study.vue'
import Exam from '../views/Exam.vue'
import Statistics from '../views/Statistics.vue'
import Profile from '../views/Profile.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminArticles from '../views/admin/Articles.vue'
import AdminUsers from '../views/admin/Users.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    component: UserLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'articles', name: 'Articles', component: Articles },
      { path: 'study', name: 'Study', component: Study },
      { path: 'exam', name: 'Exam', component: Exam },
      { path: 'statistics', name: 'Statistics', component: Statistics },
      { path: 'profile', name: 'Profile', component: Profile }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'articles', name: 'AdminArticles', component: AdminArticles },
      { path: 'users', name: 'AdminUsers', component: AdminUsers }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && user.role !== 'admin') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
