<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Log In</button>
    <p @click="$emit('switch')">Don't have an account yet? Register</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await userStore.signIn(email.value, password.value)

    // Esperamos a que el usuario esté seteado correctamente
    if (userStore.user) {
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
</style>