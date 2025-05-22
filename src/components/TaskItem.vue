<template>
  <div>
    <p :style="{ textDecoration: task.is_complete ? 'line-through' : 'none' }">
      {{ task.title }}
    </p>
    <button @click="handleToggle">
      {{ task.is_complete ? 'Undo' : 'Done' }}
    </button>
    <button @click="handleDelete">Delete</button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/store/task'
const taskStore = useTaskStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const handleDelete = () => {
  taskStore.deleteTask(props.task.id)
}

const handleToggle = () => {
  taskStore.toggleComplete(props.task.id, props.task.is_complete)
}
</script>