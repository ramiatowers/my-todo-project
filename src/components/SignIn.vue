<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Log In</button>
    <p @click="$emit('switch')">¿No tenés cuenta? Registrate</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const email = ref('')
const password = ref('')
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    await userStore.signIn(email.value, password.value)
    // TODO: redireccionar al dashboard si login exitoso
  } catch (error) {
    alert(error.message)
  }
}
</script>