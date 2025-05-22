<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser()

    if (user.value) {
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  } catch (error) {
    console.error(error)
  }
})
</script>
