<template>
  <div class="dashboard-wrapper">
    <AppHeader />
    <main class="dashboard-content">
      <TaskList />
      <NewTask />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import NewTask from '@/components/NewTask.vue'
import TaskList from '@/components/TaskList.vue'
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #323441;
  padding-bottom: 6rem;
}
</style>