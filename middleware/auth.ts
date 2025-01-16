export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    
    if (!auth.token && to.path !== '/login') {
      return navigateTo('/login')
    }
    
    if (auth.token && to.path === '/login') {
      return navigateTo('/')
    }
  })