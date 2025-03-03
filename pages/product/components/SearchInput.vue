<template>
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  
  const searchQuery = ref("");
  const emit = defineEmits(["update:search"]);
  
  const clearSearch = () => {
    searchQuery.value = "";
    emit("update:search", searchQuery.value);
  };
  </script>
  