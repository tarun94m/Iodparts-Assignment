<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">Electronic Components Catalog</h1>
        <button @click="auth.logout" class="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
  
      <div class="mb-6 flex gap-4">
        <select v-model="sortBy" class="border rounded p-2">
          <option value="partNumber">Sort by Part Number</option>
          <option value="manufacturer">Sort by Manufacturer</option>
          <option value="price">Sort by Price</option>
        </select>
        
        <select v-model="filterCategory" class="border rounded p-2">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
  
      <div v-if="loading" class="text-center py-8">
        Loading...
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center py-8">
        {{ error }}
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border text-left w-24">Image</th>
              <th class="p-3 border text-left">Mfr.Part#</th>
              <th class="p-3 border text-left">Manufacturer</th>
              <th class="p-3 border text-left">Description</th>
              <th class="p-3 border text-left">Availability</th>
              <th class="p-3 border text-left">Pricing (USD)</th>
              <th class="p-3 border text-left w-24">Buy</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in displayedItems" :key="item.id" class="hover:bg-gray-50">
              <td class="p-3 border">
                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-contain mx-auto"/>
              </td>
              <td class="p-3 border font-mono">{{ item.partNumber }}</td>
              <td class="p-3 border">{{ item.manufacturer }}</td>
              <td class="p-3 border">
                <div class="font-semibold">{{ item.name }}</div>
                <div class="text-sm text-gray-600">{{ item.description }}</div>
                <div class="text-xs text-gray-500">Category: {{ item.category }}</div>
              </td>
              <td class="p-3 border">
                <span :class="[
                  'px-2 py-1 rounded text-sm',
                  item.stock > 50 ? 'bg-green-100 text-green-800' : 
                  item.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                ]">
                  {{ item.stock }} in stock
                </span>
              </td>
              <td class="p-3 border">
                <div class="text-sm">
                  <div>1+: ${{ item.price }}</div>
                  <div>10+: ${{ (item.price * 0.95).toFixed(2) }}</div>
                  <div>100+: ${{ (item.price * 0.90).toFixed(2) }}</div>
                </div>
              </td>
              <td class="p-3 border">
                <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                  Add to Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="mt-8 flex justify-center items-center space-x-2">
        <button
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          First
        </button>
        
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <div class="flex space-x-1">
          <button
            v-for="page in displayedPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 rounded',
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
        </div>
        
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
        
        <button
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
      
      <div class="mt-4 text-center text-gray-600">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>
  </template>
  
  <script setup>
  const auth = useAuthStore()
  const loading = ref(true)
  const error = ref('')
  const items = ref([])
  const currentPage = ref(1)
  const itemsPerPage = 10 // Show 10 items per page in table format
  const sortBy = ref('partNumber')
  const filterCategory = ref('')
  
  const manufacturers = [
    'Texas Instruments',
    'STMicroelectronics',
    'Microchip',
    'ON Semiconductor',
    'Analog Devices',
    'NXP Semiconductors',
    'Infineon',
    'Vishay'
  ]
  
  const categories = [
    'Controllers and Processors',
    'Integrated Circuits - ICs',
    'Discrete Semiconductors',
    'Circuit Protection',
    'Sensors and Transducers',
    'Passive Components',
    'Connectors',
    'Optoelectronics',
    'Switches and Relays'
  ]
  
  // Mock API call
  const fetchItems = async () => {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate 40 products
      items.value = Array.from({ length: 40 }, (_, i) => {
        const category = categories[Math.floor(i / 5)]
        const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)]
        
        return {
          id: i + 1,
          name: `${manufacturer} ${category.split(' ')[0]} Component`,
          partNumber: `${manufacturer.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          manufacturer: manufacturer,
          description: `High-performance ${category.toLowerCase()} with advanced features and reliable operation`,
          price: (Math.random() * 100 + 5).toFixed(2),
          category: category,
          stock: Math.floor(Math.random() * 100) + 10,
          image: `/api/placeholder/200/200`
        }
      })
    } catch (err) {
      error.value = 'Failed to fetch items'
    } finally {
      loading.value = false
    }
  }
  
  // Computed properties for filtering and pagination
  const filteredItems = computed(() => {
    let filtered = [...items.value]
    
    if (filterCategory.value) {
      filtered = filtered.filter(item => item.category === filterCategory.value)
    }
    
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'partNumber':
          return a.partNumber.localeCompare(b.partNumber)
        case 'manufacturer':
          return a.manufacturer.localeCompare(b.manufacturer)
        case 'price':
          return parseFloat(a.price) - parseFloat(b.price)
        default:
          return 0
      }
    })
    
    return filtered
  })
  
  const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))
  
  const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredItems.value.slice(start, start + itemsPerPage)
  })
  
  // Calculate displayed page numbers
  const displayedPages = computed(() => {
    const range = 2
    let start = Math.max(1, currentPage.value - range)
    let end = Math.min(totalPages.value, currentPage.value + range)
    
    if (start === 1) {
      end = Math.min(totalPages.value, 5)
    }
    if (end === totalPages.value) {
      start = Math.max(1, totalPages.value - 4)
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
  
  // Watch for filter/sort changes to reset pagination
  watch([sortBy, filterCategory], () => {
    currentPage.value = 1
  })
  
  // Dynamic SEO meta tags
  useHead({
    title: computed(() => `Electronic Components Catalog (Page ${currentPage.value}) - Nuxt SSR App`),
    meta: [
      {
        name: 'description',
        content: computed(() => 
          `Browse our electronic components - Page ${currentPage.value} of ${totalPages.value}. ${
            filterCategory.value ? `Filtered by ${filterCategory.value}.` : 'All categories available.'
          }`
        )
      }
    ]
  })
  
  // Fetch items on component mount
  onMounted(() => {
    fetchItems()
  })
  </script>