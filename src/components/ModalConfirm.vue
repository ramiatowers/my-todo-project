<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <h2 class="modal-title">{{ title }}</h2>
      <p class="modal-message">{{ message }}</p>
      <div class="form-buttons">
        <button @click="$emit('confirm')">✅ Confirm</button>
        <button @click="$emit('cancel')">❌ Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Please Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  }
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  color: white;
  font-family: var(--font-body);
  box-shadow: 0 0 16px #00ffee;
  text-align: center;
}
.modal-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.modal-message {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.form-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.form-buttons button {
  padding: 0.5rem 1.2rem;
  background: #00ffee;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
.form-buttons button:hover {
  background: #00bfa6;
}
</style>