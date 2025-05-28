<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <header v-if="title" class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
      </header>

      <section class="modal-body">
        <!-- Primero el contenido del slot -->
        <slot />

        <!-- Luego los botones -->
        <div class="form-buttons" v-if="type === 'info'">
          <button @click="$emit('close')">❌ Close</button>
        </div>
        <div class="form-buttons" v-else>
          <button @click="$emit('confirm')">✅ Confirm</button>
          <button @click="$emit('close')">❌ Cancel</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  type: {
    type: String,
    default: 'confirm'
  }
})

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  color: white;
  font-family: var(--font-body);
  box-shadow: 0 0 16px #00ffee;
}

.modal-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}
</style>