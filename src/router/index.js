import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/Auth.vue'
import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/',
    redirect: '/dashboard' // Opción para más comodidad (revisar)
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router