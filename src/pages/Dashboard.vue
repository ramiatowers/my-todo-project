<template>
  <div class="dashboard-wrapper">
    <AppHeader />

    <main class="dashboard-content">
      <Nav />
      <NewTask />

      <TaskList />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import Nav from '@/components/Nav.vue'
import NewTask from '@/components/NewTask.vue'
import TaskList from '@/components/TaskList.vue'
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

/* Responsive para desktop */
@media (min-width: 768px) {
  .dashboard-content {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>