<template>
  <header class="app-header">
    <h1>My Todo App</h1>
    <button @click="logout">Log Out</button>
  </header>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  await userStore.signOut()
  router.push('/auth')
}
</script>

<style scoped>
</style>