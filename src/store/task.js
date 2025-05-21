import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { useUserStore } from './user'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  actions: {
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
    }
  }
})