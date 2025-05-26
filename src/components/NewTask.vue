<template>
  <div class="new-task-wrapper">
    <!-- BOTÓN FLOTANTE + -->
    <button v-if="!formVisible" class="floating-add-btn" @click="formVisible = true">
      ➕
    </button>

    <!-- FORMULARIO NUEVA TAREA -->
    <div v-if="formVisible" class="overlay">
      <form @submit.prevent="handleSubmit" class="task-form">
        <h2>Add New Task</h2>

        <input
          v-model="title"
          type="text"
          placeholder="Task title"
          required
        />

        <textarea
          v-model="description"
          placeholder="Task description (optional)"
          rows="3"
        ></textarea>

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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}

.task-form {
  background: #1e1e1e;
  padding: 2rem;
  border: 1px solid #444;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--font-body);
}

.task-form input,
.task-form textarea {
  padding: 0.75rem;
  background: #333;
  border: 1px solid #666;
  border-radius: 0.5rem;
  color: white;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.form-buttons button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #00ffee;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.form-buttons button:hover {
  background: #00bfa6;
}
</style>