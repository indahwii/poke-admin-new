<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead>
      <tr>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
          {{ $t("products.number") }}
        </th>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
          {{ $t("products.name") }}
        </th>
        <th scope="col" class="py-3.5 pl-3 pr-4 text-center text-sm font-semibold text-gray-900">
          {{ $t("products.action") }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!loading" class="divide-y divide-gray-200">
      <tr v-for="(berry, index) in productStore.products" :key="berry.name">
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {{ (productStore.pagination.currentPage - 1) * productStore.pagination.perPage + index + 1 }}
        </td>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {{ berry.name }}
        </td>
        <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center flex justify-center space-x-2">
          <NuxtLink :to="`/product/${getIdFromUrl(berry.url)}`" class="inline-flex items-center text-black hover:text-indigo-900">
            <EyeIcon class="w-5 h-5 mr-1" />
          </NuxtLink>

          <NuxtLink 
            :to="`/product/edit/${getIdFromUrl(berry.url)}`" 
            class="inline-flex items-center text-blue-600 hover:text-blue-900"
          >
            <PencilIcon class="w-5 h-5" />
          </NuxtLink>


          <button @click="deleteProduct(berry.name)" class="inline-flex items-center text-red-600 hover:text-red-900">
            <TrashIcon class="w-5 h-5" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useProductStore } from "~/pages/product/stores/productStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const productStore = useProductStore(); 

const pagination = computed(() => ({
  currentPage: productStore.currentPage,
  perPage: productStore.perPage,
}));

const paginatedProducts = computed(() => {
  const start = (productStore.currentPage - 1) * productStore.perPage;
  const end = start + productStore.perPage;
  return productStore.products.slice(start, end);
});

const getIdFromUrl = (url) => {
  return url.split("/").filter(Boolean).pop();
};

const deleteProduct = (name) => {
  productStore.products = productStore.products.filter(product => product.name !== name);
};

defineProps({
  loading: Boolean,
});
</script>
