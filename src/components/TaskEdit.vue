<template>
  <div class="edit-form">
    <h2>Edit Task</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Title:
        <input v-model="title" type="text" required />
      </label>

      <label>
        Description:
        <textarea v-model="description" rows="4" />
      </label>

      <div class="form-buttons">
        <button type="submit">💾 Save</button>
        <button type="button" @click="$emit('cancel')">❌ Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/store/task'

const props = defineProps({
  task: { type: Object, required: true }
})

const emit = defineEmits(['cancel', 'updated']) // ✅ IMPORTANTE

const taskStore = useTaskStore()
const title = ref(props.task.title)
const description = ref(props.task.description || '')

const handleSubmit = async () => {
  try {
    await taskStore.updateTask(props.task.id, {
      title: title.value,
      description: description.value,
      updated_at: new Date().toISOString()
    })

    // ✅ EMIT updated con la nueva data
    emit('updated', {
      id: props.task.id,
      title: title.value,
      description: description.value
    })

  } catch (err) {
    alert(err.message || 'Error updating task')
  }
}
</script>

<style scoped>
.edit-form {
  padding: 1.5rem;
  border: 2px solid #555;
  border-radius: 1rem;
  background: #1e1e1e;
  color: white;
  font-family: 'Press Start 2P', monospace;
}

.edit-form h2 {
  margin-top: 0;
  font-size: 1.2rem;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  background: #333;
  border: 1px solid #777;
  color: white;
  font-family: inherit;
}

.form-buttons {
  display: flex;
  gap: 1rem;
}

button {
  background: #444;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: inherit;
}

button:hover {
  background: #666;
}
</style>