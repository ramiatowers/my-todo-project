<template>
  <div class="new-task-wrapper">
    <button v-if="!formVisible" class="floating-add-btn" @click="formVisible = true">➕</button>

    <div v-if="formVisible" class="form-overlay">
      <form @submit.prevent="handleSubmit" class="form-panel">
        <h2>Add New Task</h2>
        <input v-model="title" type="text" placeholder="Task title" required />
        <textarea v-model="description" placeholder="Task description (optional)" rows="3"></textarea>

        <div class="form-buttons">
          <button type="submit">💾 Save</button>
          <button type="button" @click="cancelForm">❌ Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()
const title = ref('')
const description = ref('')
const formVisible = ref(false)

const handleSubmit = async () => {
  if (!title.value.trim()) return
  try {
    await taskStore.addTask(title.value, description.value)
    title.value = ''
    description.value = ''
    formVisible.value = false
  } catch (err) {
    alert(err.message || 'Error creating task')
  }
}

function cancelForm() {
  title.value = ''
  description.value = ''
  formVisible.value = false
}
</script>

<style scoped>
.floating-add-btn {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: #00ffee;
  color: black;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  cursor: pointer;
  z-index: 999;
}
</style>