// src/store/task.js
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { useUserStore } from './user'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),

  actions: {
    async fetchTasks() {
      const userStore = useUserStore()
      const user = userStore.user

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      this.tasks = data
    },

    async addTask(title, description) {
      const userStore = useUserStore()
      const user = userStore.user

      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            description,
            user_id: user.id,
            status: 'Pending',
            elapsed_time: 0,
            last_start: null
          }
        ])

      if (error) throw error
      await this.fetchTasks()
    },

    async deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    async updateStatus(id, newStatus) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return

      const now = new Date()
      const updates = { status: newStatus }

      if (newStatus === 'In progress') {
        updates.last_start = now.toISOString()
      }

      if (['On-hold', 'Done'].includes(newStatus)) {
        const lastStart = task.last_start ? new Date(task.last_start) : null
        if (lastStart) {
          const elapsedSoFar = typeof task.elapsed_time === 'number' ? task.elapsed_time : 0
          const diffInSeconds = Math.floor((now - lastStart) / 1000)
          updates.elapsed_time = elapsedSoFar + diffInSeconds
        }
      }

      if (!('last_start' in updates)) {
        updates.last_start = task.last_start
      }

      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      Object.assign(task, updates)
    },

    async updateTask(id, updates) {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      const index = this.tasks.findIndex(t => t.id === id)
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updates }
      }
    }
  }
})