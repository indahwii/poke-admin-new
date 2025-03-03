<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div class="sm:col-span-4">
      <label class="block text-sm font-medium text-gray-900">Title</label>
      <input v-model="formData.title" type="text" class="input-field" required />
    </div>

    <div class="sm:col-span-4">
      <label class="block text-sm font-medium text-gray-900">Price</label>
      <input v-model="formData.price" type="number" step="0.01" class="input-field" required />
    </div>

    <div class="sm:col-span-4">
      <label class="block text-sm font-medium text-gray-900">Category</label>
      <input v-model="formData.category" type="text" class="input-field" required />
    </div>

    <div class="sm:col-span-4">
      <label class="block text-sm font-medium text-gray-900">Description</label>
      <textarea v-model="formData.description" rows="3" class="input-field" required></textarea>
    </div>

    <div class="sm:col-span-4">
      <label class="block text-sm font-medium text-gray-900">Image URL</label>
      <input v-model="formData.image" type="text" class="input-field" required />
    </div>

    <div class="sm:col-span-4">
      <button type="submit" :disabled="loading" class="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 disabled:opacity-50">
        {{ loading ? "Saving..." : buttonText }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  product: Object,
  loading: Boolean,
  buttonText: String,
});

const emit = defineEmits(["submit"]);

const formData = reactive({ ...props.product });

watch(
  () => props.product,
  (newVal) => {
    Object.assign(formData, newVal);
  },
  { deep: true }
);

const handleSubmit = () => {
  emit("submit", { ...formData }); 
};
</script>

<style scoped>
.input-field {
  @apply block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600;
}
</style>