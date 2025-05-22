<template>
  <div>
    <AppHeader />
    <Nav />
    <NewTask />
    <TaskList />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import Nav from '@/components/Nav.vue'
import NewTask from '@/components/NewTask.vue'
import TaskList from '@/components/TaskList.vue'
</script>