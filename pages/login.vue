<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                v-model="email"
                type="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span v-if="loading">Loading...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
          
          <div v-if="error" class="text-red-500 text-center">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  const auth = useAuthStore()
  
  const handleLogin = async () => {
    try {
      loading.value = true
      error.value = ''
      await auth.login(email.value, password.value)
      navigateTo('/')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Add meta tags for SEO
  useHead({
    title: 'Login - Nuxt SSR App',
    meta: [
      { name: 'description', content: 'Sign in to access your account' }
    ]
  })
  </script>