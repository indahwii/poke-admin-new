<template>
    <nav class="flex" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 px-6 py-2">
        <li class="flex">
          <router-link to="/product" class="text-gray-400 hover:text-gray-500">Home</router-link>
        </li>
        <li v-for="page in pages" :key="page.name" class="flex">
          <svg class="h-5 w-5 text-gray-300 mx-2" viewBox="0 0 24 44" fill="currentColor">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <router-link :to="page.href" class="text-sm font-medium text-gray-500 hover:text-gray-700">
            {{ page.name }}
          </router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  defineProps({ pages: Array });
  </script>
  