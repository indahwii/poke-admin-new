<template>
    <div>
      <Breadcrumb :pages="breadcrumbPages" />
  
      <div class="max-w-full mx-auto p-6">
        <h2 class="text-2xl font-bold mb-6">Edit Product</h2>
        <h2 id="product-heading" class="sr-only">Product Information</h2>
  
        <ProductForm :product="product" buttonText="Edit Product" :productImageUrl="productImageUrl" />
  
        <Transition name="slide-fade">
          <div v-if="showAlert" class="fixed top-5 right-5 w-96 z-50 bg-blue-50 p-4 shadow-lg rounded-md">
            <div class="flex">
              <InformationCircleIcon class="size-5 text-blue-400" />
              <p class="ml-3 text-sm text-blue-700 flex-1">{{ message }}</p>
              <button @click="showAlert = false" class="ml-6 text-sm font-medium text-blue-700 hover:text-blue-600">Close →</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import Breadcrumb from "../components/Breadcrumb.vue"; 
  import ProductForm from "../components/ProductForm.vue";
  
  const route = useRoute();
  const product = ref(null);
  const productImageUrl = ref("");
  const loading = ref(true);
  const showAlert = ref(false);
  const message = ref("");
  
  const breadcrumbPages = [
    { name: 'Products', href: '/product' },
    { name: 'Edit Product', href: '/product/add' }
  ];
  
  onMounted(async () => {
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`);
      product.value = data;
      productImageUrl.value = data.image; // Use the image URL from the API response
    } catch (error) {
      console.error("Error fetching product details:", error);
      showAlert.value = true;
      message.value = "Failed to fetch product details. Please try again.";
    } finally {
      loading.value = false;
    }
  });
  </script>