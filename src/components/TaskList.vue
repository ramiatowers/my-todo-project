<template>
  <section style="display: flex; gap: 2rem; align-items: flex-start;">
    <!-- Tareas por hacer -->
    <div>
      <h2>To Do</h2>
      <TaskItem
        v-for="task in incompleteTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <!-- Tareas completadas -->
    <div>
      <h2>Done</h2>
      <TaskItem
        v-for="task in completeTasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

onMounted(() => {
  taskStore.fetchTasks()
})

// Separar tareas según su estado
const incompleteTasks = computed(() =>
  tasks.value.filter(task => task.status !== 'Done')
)

const completeTasks = computed(() =>
  tasks.value.filter(task => task.status === 'Done')
)
</script>