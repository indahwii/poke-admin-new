<template>
  <div class="px-4 sm:px-6 lg:px-8 flex flex-col flex-grow h-full overflow-hidden">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">{{ $t("products.title") }}</h1>
        <p class="mt-2 text-sm text-gray-700">
          {{ $t("products.description") }}
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink
          to="/product/add"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ $t("products.addProduct") }}
        </NuxtLink>
      </div>
    </div>

    <div class="mt-4">
      <input
        v-model="searchQuery"
        @input="productStore.setSearchQuery(searchQuery)"
        type="text"
        :placeholder="$t('products.searchPlaceholder')"
        class="w-full border-0 border-b-2 border-gray-300 px-0 py-2 text-sm focus:ring-0 focus:border-indigo-500 focus:outline-none"
      />
    </div>

    <div v-if="loading" class="mt-6 text-center text-gray-500">
      {{ $t("products.loading") }}
    </div>

    <div class="overflow-auto bg-white">
      <ProductTable :products="productStore.products" :loading="loading" />
    </div>

    <Pagination
      class="pt-3"
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useProductStore } from "~/pages/product/stores/productStore";
import ProductTable from "./components/ProductTable.vue";
import Pagination from "./components/Pagination.vue";
import { useDebounceFn } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const productStore = useProductStore();
const loading = ref(true);
const currentPage = ref(1);
const searchQuery = ref("");
const totalPages = computed(() => productStore.pagination.totalPages);

const getStoredPage = () => {
  const savedPage = localStorage.getItem("productPage");
  return savedPage ? parseInt(savedPage, 10) : 1;
};

const savePageToStorage = (page) => {
  localStorage.setItem("productPage", page);
};

const fetchProducts = async () => {
  loading.value = true;
  await productStore.fetchProducts(currentPage.value, searchQuery.value);
  loading.value = false;
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  savePageToStorage(newPage);
  fetchProducts();
};

const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1;
  savePageToStorage(1);
  fetchProducts();
}, 300);

watch(currentPage, fetchProducts);
watch(searchQuery, debouncedSearch);

onMounted(() => {
  currentPage.value = getStoredPage();
  fetchProducts();
});
</script>
