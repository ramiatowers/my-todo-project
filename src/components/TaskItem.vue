<!-- TASKITEM.VUE ACTUALIZADO -->
<template>
  <section class="task-card" :class="statusClass">
    <header class="header-menu">
      <div class="change-controls">
        <button
          @click="menuOpen = !menuOpen"
          class="menu-btn"
          :class="{ done: task.status === 'Done' }"
        >
          <!-- Ícono rueda -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-check"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <ChangeMenu
          v-if="menuOpen"
          :is-done="task.status === 'Done'"
          @info="$emit('info', task)"
          @edit="$emit('edit', task)"
          @delete="$emit('delete', task)"
          @close="menuOpen = false"
        />
      </div>

      <!-- CHECK BUTTON -->
      <button
        @click="emitCheck"
        class="check-btn"
        :class="{ active: task.status === 'Done' }"
      >
        <svg
          v-if="task.status === 'Done'"
          xmlns="http://www.w3.org/2000/svg"
          class="icon-check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
          <path d="m9 12 2 2 4-4" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="icon-check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        </svg>
      </button>
    </header>

    <h2 class="task-title">{{ task.title }}</h2>
    <p class="task-desc">{{ task.description }}</p>

    <div class="time-controls">
      <span class="clock">{{ formattedTime }}</span>
      <div class="task-buttons">
        <!-- PLAY BUTTON -->
        <button
          v-if="task.status !== 'In progress'"
          @click="emitTimerConfirm('In progress')"
          class="status-btn"
        >
          <svg
            class="icon-control"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </button>

        <!-- PAUSE BUTTON -->
        <button
          v-else
          @click="emitTimerConfirm('On-hold')"
          class="status-btn"
        >
          <svg
            class="icon-control"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useTaskStore } from '@/store/task'
import ChangeMenu from './ChangeMenu.vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['edit', 'delete', 'info', 'check', 'timer'])
const taskStore = useTaskStore()
const menuOpen = ref(false)

const runningTime = ref(props.task.elapsed_time)
let timer = null

const tick = () => {
  const start = new Date(props.task.last_start)
  const diff = Math.floor((Date.now() - start) / 1000)
  runningTime.value = props.task.elapsed_time + diff
}

watch(
  () => [props.task.status, props.task.last_start],
  () => {
    clearInterval(timer)
    if (props.task.status === 'In progress' && props.task.last_start) {
      tick()
      timer = setInterval(tick, 1000)
    } else {
      runningTime.value = props.task.elapsed_time
    }
  },
  { immediate: true }
)

onUnmounted(() => clearInterval(timer))

const formattedTime = computed(() => formatTime(runningTime.value))

const statusClass = computed(() => {
  return {
    'bg-gray': ['Pending', 'Undo'].includes(props.task.status),
    'bg-blue': props.task.status === 'In progress',
    'bg-orange': props.task.status === 'On-hold',
    'bg-green': props.task.status === 'Done'
  }
})

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function emitTimerConfirm(status) {
  emit('timer', { task: props.task, nextStatus: status })
}

function emitDelete() {
  emit('delete', props.task)
}

function emitCheck() {
  emit('check', props.task)
}
</script>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 132, 255, 0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
}

.bg-gray    { background-color: var(--color-pending); }
.bg-blue    { background-color: var(--color-progress); }
.bg-orange  { background-color: var(--color-hold); }
.bg-green   { background-color: var(--color-done); }
.bg-pink    { background-color: var(--color-undo); }

button {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-menu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  filter: drop-shadow(0 0 2px #00ffee);
}

.change-controls {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.check-btn {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  transition: filter 0.2s ease;
}

.menu-btn {
  color: white;
  filter: drop-shadow(0 0 2px #ff00d4);
  transition: color 0.3s ease;
}

.menu-btn.done {
  color: white;
  filter: drop-shadow(0 0 2px #02ffb3);
}

.icon-check {
  width: 1rem;
  height: 1rem;
  stroke: currentColor;
  filter: drop-shadow(0 0 4px #ff00d4);
  transition: filter 0.2s ease;
}

.check-btn.active .icon-check {
  filter: drop-shadow(0 0 2px #02ffb3);
}

.task-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
}

.task-desc {
  font-family: var(--font-body);
  font-size: 0.7rem;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border: 0.1rem solid #02ffb3;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.0);
  color: #02ffb3;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.task-desc:hover {
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.15);
  border-color: var(--color-progress);
}

.time-controls {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.clock {
  font-family: var(--font-tech);
  font-size: 2.5rem;
  color: #02ffb3;
  text-shadow: var(--glow-cyan);
}

.icon-control {
  width: 2rem;
  height: 2rem;
  color: #02ffb3;
  padding: 0;
}
</style>