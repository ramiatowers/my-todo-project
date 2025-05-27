<template>
  <section class="task-section">
    <div class="task-column">
      <h2 class="neon-title-to-do">To Do</h2>
      <TaskItem
        v-for="task in incompleteTasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
        @delete="handleDelete"
        @info="handleInfo"
        @check="handleCheck"
        @timer="handleTimer"
      />
    </div>

    <div class="task-column">
      <h2 class="neon-title-done">Done</h2>
      <TaskItem
        v-for="task in completeTasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
        @delete="handleDelete"
        @info="handleInfo"
        @check="handleCheck"
        @timer="handleTimer"
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

    <!-- Info Modal -->
    <ModalInfo
      v-if="taskBeingViewed"
      :task="taskBeingViewed"
      @close="taskBeingViewed = null"
    />

    <!-- Universal Confirm Modal -->
    <ModalConfirm
      v-if="taskToConfirm"
      :title="confirmTitle"
      :message="confirmMessage"
      @confirm="confirmAction"
      @cancel="taskToConfirm = null"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/store/task'
import { storeToRefs } from 'pinia'
import TaskItem from './TaskItem.vue'
import TaskEdit from './TaskEdit.vue'
import ModalInfo from './ModalInfo.vue'
import ModalConfirm from './ModalConfirm.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const taskBeingEdited = ref(null)
const taskBeingViewed = ref(null)
const taskToConfirm = ref(null)

// 🟡 Lógica para obtener el texto dinámico según la acción
const confirmTitle = computed(() => {
  if (!taskToConfirm.value) return ''
  const action = taskToConfirm.value.type
  if (action === 'delete') return 'Confirm Deletion'
  if (action === 'check') return 'Mark Task as Done?'
  if (action === 'timer') return 'Confirm Timer Action'
  return 'Confirm Action'
})

const confirmMessage = computed(() => {
  const item = taskToConfirm.value
  if (!item) return ''
  const { type, task } = item
  if (type === 'delete') return 'Are you sure you want to delete this task?'
  if (type === 'check') {
    return task.status === 'Done'
      ? 'Do you want to mark this task as not done?'
      : 'Do you want to mark this task as done?'
  }
  if (type === 'timer') {
    return task.status === 'In progress'
      ? 'Pause this task?'
      : 'Start working on this task?'
  }
  return ''
})

// 🟢 Acciones confirmadas
function confirmAction() {
  const { type, task } = taskToConfirm.value
  if (type === 'delete') {
    taskStore.deleteTask(task.id)
  } else if (type === 'check') {
    const nextStatus = task.status === 'Done' ? 'Undo' : 'Done'
    taskStore.updateStatus(task.id, nextStatus)
  } else if (type === 'timer') {
    taskStore.updateStatus(task.id, taskToConfirm.value.nextStatus)
  }
  taskToConfirm.value = null
}

// 🔵 Manejadores de eventos emitidos por TaskItem.vue
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

function handleInfo(task) {
  taskBeingViewed.value = task
}

function handleDelete(task) {
  taskToConfirm.value = { task, type: 'delete' }
}

function handleCheck(task) {
  taskToConfirm.value = { task, type: 'check' }
}

function handleTimer({ task, nextStatus }) {
  taskToConfirm.value = { task, type: 'timer', nextStatus }
} 

const incompleteTasks = computed(() =>
  tasks.value.filter(task => task.status !== 'Done')
)

const completeTasks = computed(() =>
  tasks.value.filter(task => task.status === 'Done')
)

onMounted(() => taskStore.fetchTasks())
</script>

<style scoped>

.task-section {
    display: flex;
    flex-direction: column;
}

.neon-title-to-do {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: #ff00d4;
  text-shadow:
    0 0 4px #ff00d4,
    0 0 10px #ff00d4,
    0 0 20px #ff00d4,
    0 0 30px #00fff7,   /* Cian visible */
    0 0 40px #00fff7;
  animation: flicker 2.5s infinite;
  text-align: center;
  margin: 1.5rem 0;
}

.neon-title-done {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: #02ffb3;
  text-shadow:
    0 0 4px #02ffb3,
    0 0 10px #02ffb3,
    0 0 20px #02ffb3,
    0 0 30px #00fff7,
    0 0 40px #00fff7;
  animation: flicker-green 2.5s infinite;
  text-align: center;
  margin: 1.5rem 0;
}

/* ✨ Animación tipo flicker (neón intermitente) */
@keyframes flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px #ff00d4,
      0 0 10px #ff00d4,
      0 0 20px #ff00d4,
      0 0 30px #002fff,
      0 0 40px #002fff;
  }

  20%, 24%, 55% {
    opacity: 0.4;
    text-shadow: none;
  }
}

@keyframes flicker-green {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px #02ffb3,
      0 0 10px #02ffb3,
      0 0 20px #02ffb3,
      0 0 30px #002fff,
      0 0 40px #002fff;
  }

  20%, 24%, 55% {
    opacity: 0.4;
    text-shadow: none;
  }
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