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

    async addTask(title) {
      const userStore = useUserStore()
      const user = userStore.user

      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            user_id: user.id,
            status: 'Pending',
            elapsed_time: 0,
            last_start: null
          }
        ])

      if (error) throw error

      // Volvemos a traer las tareas actualizadas
      await this.fetchTasks()
    },
    
    async deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Actualizamos el estado local
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    async updateStatus(id, newStatus) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return

      const now = new Date()
      const updates = { status: newStatus }

      // Si pasa a "In progress"
      if (newStatus === 'In progress') {
        updates.last_start = now.toISOString()
      }

      // Si pasa a "On-hold" o "Done"
      if (['On-hold', 'Done'].includes(newStatus)) {
        const lastStart = task.last_start ? new Date(task.last_start) : null

        if (lastStart) {
          const elapsedSoFar = typeof task.elapsed_time === 'number' ? task.elapsed_time : 0
          const diffInSeconds = Math.floor((now - lastStart) / 1000)
          updates.elapsed_time = elapsedSoFar + diffInSeconds

          // No tocamos last_start → lo dejamos como está
        }
      }

      // ⛑ Proteger campo si no se está actualizando
      if (!('last_start' in updates)) {
        updates.last_start = task.last_start
      }

      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      Object.assign(task, updates)
    }
  }
})