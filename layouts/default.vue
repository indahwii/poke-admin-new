<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-lg font-semibold text-gray-900">Dashboard</h1>
        <button
          @click="logout"
          class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-500"
        >
          Logout
        </button>
      </header>

      <div class="flex-1 overflow-auto p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const logout = () => {
  console.log("Logging out...");
  // Add logout logic here
};
</script>
