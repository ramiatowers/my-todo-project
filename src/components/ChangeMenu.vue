<template>
  <div class="popup-menu">
    <button @click="$emit('info')">🛈 Info</button>
    <button @click="$emit('edit')">✏️ Edit</button>
    <button @click="$emit('delete')">🗑️ Delete</button>
    <button class="close-btn" @click="$emit('close')">✖️ Close</button>
  </div>
</template>

<script setup>
defineEmits(['info', 'edit', 'delete', 'close'])
</script>

<style scoped>
.popup-menu {
  position: absolute;
  top: 2rem;
  right: 0;
  background: #1f1f2b;
  border: 1px solid #444;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 255, 255, 0.3);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.popup-menu button {
  all: unset;
  font-size: 0.95rem;
  color: #fff;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.popup-menu button:hover {
  background: #2d2d3c;
  color: #00ffee;
}

.close-btn {
  text-align: right;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>