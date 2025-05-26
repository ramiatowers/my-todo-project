<template>
  <section class="task-section">
    <div class="task-column">
      <h2>To Do</h2>
      <TaskItem
        v-for="task in incompleteTasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
      />
    </div>

    <div class="task-column">
      <h2>Done</h2>
      <TaskItem
        v-for="task in completeTasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
      />
    </div>

    <!-- Edit Task Modal -->
    <div v-if="taskBeingEdited" class="modal-overlay">
      <div class="modal-content">
        <TaskEdit
          :task="taskBeingEdited"
          @updated="handleUpdate"
          @cancel="taskBeingEdited = null"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/store/task'
import { storeToRefs } from 'pinia'
import TaskItem from './TaskItem.vue'
import TaskEdit from './TaskEdit.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const taskBeingEdited = ref(null)

const incompleteTasks = computed(() =>
  tasks.value.filter(task => task.status !== 'Done')
)
const completeTasks = computed(() =>
  tasks.value.filter(task => task.status === 'Done')
)

onMounted(() => taskStore.fetchTasks())

function handleEdit(task) {
  taskBeingEdited.value = task
}

function handleUpdate(updatedTask) {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...tasks.value[index], ...updatedTask }
  }
  taskBeingEdited.value = null
}
</script>

<style scoped>

.task-section {
    display: flex;
    gap: 2rem;
    flex-direction: column;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: #1c1c1c;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px #00ffee;
}

</style>