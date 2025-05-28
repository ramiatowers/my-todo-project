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
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  font-size: 2rem;
  background: #00ffee;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-add-btn:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>