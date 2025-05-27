<template>
  <header class="app-header">
    <h1>BEFORE THE END</h1>
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
.app-header {
  background-color: #151922;
  padding: 1rem 1rem 0rem 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.app-header button {
 font-size: 0.9rem;
}
</style>