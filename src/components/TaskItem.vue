<template>
  <div class="task-card" :class="statusClass">
    <p class="task-title">{{ task.title }}</p>

    <select v-model="selectedStatus" @change="handleStatusChange">
      <option v-for="option in statusOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <button @click="handleDelete">Delete</button>

    <p class="task-time">
      Time spent:
      {{ props.task.status === 'In progress' ? formatTime(runningTime) : formatTime(props.task.elapsed_time) }}
    </p>
    <svg></svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const selectedStatus = ref(props.task.status)

const statusOptions = ['Pending', 'In progress', 'On-hold', 'Done', 'Undo']

const handleDelete = () => {
  taskStore.deleteTask(props.task.id)
}

const handleStatusChange = () => {
  const needsConfirmation = ['In progress', 'Done'].includes(selectedStatus.value)
  if (needsConfirmation) {
    const confirmed = confirm(`Are you sure you want to mark this task as "${selectedStatus.value}"?`)
    if (!confirmed) {
      selectedStatus.value = props.task.status
      return
    }
  }

  taskStore.updateStatus(props.task.id, selectedStatus.value)
}

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
}

// 🕒 Tiempo real
const runningTime = ref(props.task.elapsed_time)
let intervalId = null

const startTimer = () => {
  stopTimer()
  intervalId = setInterval(() => {
    if (props.task.last_start) {
      const start = new Date(props.task.last_start)
      const now = new Date()
      const diff = Math.floor((now - start) / 1000)
      runningTime.value = props.task.elapsed_time + diff
    }
  }, 1000)
}

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 💡 Colores dinámicos
const statusClass = computed(() => {
  switch (props.task.status) {
    case 'Pending':
      return 'bg-gray'
    case 'In progress':
      return 'bg-blue'
    case 'On-hold':
      return 'bg-orange'
    case 'Done':
      return 'bg-green'
    case 'Undo':
      return 'bg-red'
    default:
      return ''
  }
})

// 🔁 Reactividad
watch(
  () => [props.task.status, props.task.last_start],
  ([status, lastStart]) => {
    if (status === 'In progress' && lastStart) {
      startTimer()
    } else {
      stopTimer()
      runningTime.value = props.task.elapsed_time
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  stopTimer()
})
</script>