<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid' // Import Heroicons

const isOpen = ref(false)
const isMasterOpen = ref(false) // Controls sub-menu toggle

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleMasterMenu = () => {
  isMasterOpen.value = !isMasterOpen.value
}
</script>

<template>
  <aside
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed md:relative inset-y-0 left-0 w-64 bg-gray-900 text-white transition-transform transform md:translate-x-0 p-4 h-screen flex flex-col"
  >
    <h2 class="text-lg font-bold mb-4">Menu</h2>
    <ul class="flex-1 space-y-2">
      <li>
        <NuxtLink to="/" class="block p-2 hover:bg-gray-700 rounded">Home</NuxtLink>
      </li>

      <!-- Master Data Menu -->
      <li>
        <button
          @click="toggleMasterMenu"
          class="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded"
        >
          <span>Master Data</span>
          <ChevronDownIcon
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': isMasterOpen }"
          />
        </button>

        <!-- Sub-menu -->
        <ul v-if="isMasterOpen" class="ml-4 mt-1 space-y-2">
          <li>
            <NuxtLink to="/product" class="block p-2 hover:bg-gray-700 rounded">Product</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </aside>

  <!-- Sidebar Toggle Button (for mobile) -->
  <button
    @click="toggleSidebar"
    class="fixed top-4 left-4 md:hidden bg-gray-900 text-white p-2 rounded"
  >
    ☰
  </button>

  <!-- Overlay when sidebar is open -->
  <div
    v-if="isOpen"
    @click="toggleSidebar"
    class="fixed inset-0 bg-black opacity-50 md:hidden"
  ></div>
</template>
