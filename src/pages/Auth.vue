<template>
  <div class="auth-container">
    <section class="auth-box">
      <SignIn v-if="mode === 'login'" @switch="mode = 'register'" />
      <SignUp v-else @switch="mode = 'login'" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

const mode = ref('login')
</script>

<style scoped>
</style>