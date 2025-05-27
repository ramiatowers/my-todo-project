<template>
  <div class="form-overlay">
    <form @submit.prevent="handleSubmit" class="form-panel">
      <h2>Edit Task</h2>
      <input v-model="title" type="text" placeholder="Task title" required />
      <textarea v-model="description" rows="4" placeholder="Task description (optional)" />
      
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

const props = defineProps({ task: Object })
const emit = defineEmits(['cancel', 'updated'])
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