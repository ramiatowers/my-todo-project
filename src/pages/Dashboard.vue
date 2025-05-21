<template>
  <div class="dashboard-container">
    <AppHeader />
    <Nav />

    <main class="dashboard-main">
      <NewTask />
      <section class="task-list glass-box">
        <!-- Task items will be inserted here -->
      </section>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import Nav from '@/components/Nav.vue'
import NewTask from '@/components/NewTask.vue'
</script>

<style scoped>
</style>