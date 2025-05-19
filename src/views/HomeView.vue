<template>
  <div>
    <h1>Home View</h1>
    <p v-if="user">Welcome, {{ user.email }}</p>
    <button @click="setUserExample">Set user</button>
    <button @click="clearUser">Clear user</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function setUserExample() {
  userStore.setUser({
    id: '123',
    email: 'test@example.com'
  })
}

function clearUser() {
  userStore.clearUser()
}
</script>