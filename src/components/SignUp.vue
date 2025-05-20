<template>
  <form @submit.prevent="handleRegister">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
    <p @click="$emit('switch')">¿Ya tenés cuenta? Iniciá sesión</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const email = ref('')
const password = ref('')
const userStore = useUserStore()

const handleRegister = async () => {
  try {
    await userStore.signUp(email.value, password.value)
    // TODO: redireccionar al dashboard si registro exitoso
  } catch (error) {
    alert(error.message)
  }
}
</script>