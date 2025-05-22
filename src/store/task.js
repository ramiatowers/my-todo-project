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

      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: user.id }])
        .select()

      if (error) throw error

      if (data && data.length > 0) {
        this.tasks.push(data[0])
      }
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

    async toggleComplete(id, currentValue) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: !currentValue })
        .eq('id', id)

      if (error) throw error

      // Actualizamos el estado local
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.is_complete = !currentValue
      }
    }
  }
})