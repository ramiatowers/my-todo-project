<template>
  <div :class="['popup-menu', { 'popup-done': isDone }]">
    <button @click="$emit('info')" :class="{ 'done-btn': isDone }">
      <svg class="change-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
      </svg>
    </button>
    <button @click="$emit('edit')" :class="{ 'done-btn': isDone }">
      <svg class="change-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
      </svg>
    </button>
    <button @click="$emit('delete')" :class="{ 'done-btn': isDone }">
      <svg class="change-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      </svg>
    </button>
    <button class="close-btn" @click="$emit('close')" :class="{ 'done-btn': isDone }">
      <svg class="change-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  isDone: Boolean
})
</script>

<style scoped>
.popup-menu {
  position: absolute;
  top: 0rem;
  left: 2rem;
  padding: 0rem 0.3rem;
  margin: 0.1rem 0;
  background: #ff00d421;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.popup-done {
  background: #02ffb321 !important;
}

.popup-menu button {
  all: unset;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.popup-menu button:hover {
  color: #ff00d4;
}

.done-btn:hover {
  color: #02ffb3 !important;
}

.change-icon {
  width: 1rem;
  height: 1rem;
  stroke: currentColor;
}
</style>