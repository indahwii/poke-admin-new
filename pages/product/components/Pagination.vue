<template>
    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-4">
      <button
        @click="productStore.setPage(productStore.pagination.currentPage - 1)"
        :disabled="productStore.pagination.currentPage === 1"
        class="px-4 py-2 border rounded-md text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        Previous
      </button>

      <div class="flex space-x-2">
        <button
          v-for="page in productStore.pagination.totalPages"
          :key="page"
          @click="productStore.setPage(page)"
          :class="[
            'px-3 py-2 border rounded-md text-sm',
            page === productStore.pagination.currentPage ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="productStore.setPage(productStore.pagination.currentPage + 1)"
        :disabled="productStore.pagination.currentPage === productStore.pagination.totalPages"
        class="px-4 py-2 border rounded-md text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useProductStore } from "~/pages/product/stores/productStore";
  
  const productStore = useProductStore();
  
  const currentPage = computed(() => productStore.pagination.currentPage);
  const totalPages = computed(() => productStore.pagination.totalPages);
  
  const setPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      productStore.setPage(page);
    }
  };
  const nextPage = () => setPage(currentPage.value + 1);
  const prevPage = () => setPage(currentPage.value - 1);
  </script>
  
  