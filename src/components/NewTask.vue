<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="title"
      type="text"
      placeholder="Write a new task..."
      required
    />
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/store/task'

const title = ref('')
const taskStore = useTaskStore()

const handleSubmit = async () => {
  if (!title.value.trim()) return
  try {
    await taskStore.addTask(title.value)
    title.value = ''
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
</style>