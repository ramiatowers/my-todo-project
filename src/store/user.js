import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(userData) {
      this.user = userData
    },
    clearUser() {
      this.user = null
    },
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      this.setUser(data.user)
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      this.setUser(data.user)
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.clearUser()
    }
  },
  persist: true
})