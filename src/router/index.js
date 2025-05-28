import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/Auth.vue'
import Dashboard from '@/pages/Dashboard.vue'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // ← Esto protege la ruta
  },
  {
    path: '/',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = !!userStore.user

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
  } else if (to.path === '/auth' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router