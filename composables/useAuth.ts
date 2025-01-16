import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any
  }),
  
  actions: {
    async login(email: string, password: string) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email === 'test@example.com' && password === 'password') {
          const token = 'mock-jwt-token'
          this.token = token
          this.user = { email, id: 1 }
          localStorage.setItem('token', token)
          return true
        }
        throw new Error('Invalid credentials')
      } catch (error) {
        throw error
      }
    },
    
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      navigateTo('/login')
    },
    
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        return true
      }
      return false
    }
  }
})