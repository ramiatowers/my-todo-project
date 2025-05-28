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

      // Asegurarse de tener el usuario autenticado
      if (!userStore.user) await userStore.fetchUser()
      const userId = userStore.user?.id
      if (!userId) throw new Error('Unauthenticated user.')

      // Consultar tareas del usuario
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error getting tasks:', error.message)
        throw error
      }

      this.tasks = data
    },

    async addTask(title, description) {
      const userStore = useUserStore()

      // Asegurarse que el usuario está cargado
      if (!userStore.user) await userStore.fetchUser()
      const userId = userStore.user?.id
      if (!userId) throw new Error('Unauthenticated user.')

      // Insertar tarea
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description, user_id: userId }])
        .select()

      if (error) {
        console.error('❌ Error getting tasks:', error.message)
        throw error
      }

      // Agregar la nueva tarea al comienzo de la lista local
      this.tasks.unshift(data[0])
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

      // Mantener el last_start anterior si no fue actualizado
      if (!('last_start' in updates)) {
        updates.last_start = task.last_start
      }

      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) {
        console.error('❌ Error updating status:', error.message)
        throw error
      }

      Object.assign(task, updates)
    },

    async updateTask(id, updates) {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) {
        console.error('❌ Error updating task:', error.message)
        throw error
      }

      const index = this.tasks.findIndex(t => t.id === id)
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updates }
      }
    },

    async updateElapsedTime(id, newTime = 0) {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          elapsed_time: newTime,
          last_start: null
        })
        .eq('id', id)
        .select()

      if (error) {
        console.error('❌ Error resetting timer:', error.message)
      } else {
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index].elapsed_time = newTime
          this.tasks[index].last_start = null
        }
      }
    }
  }
})