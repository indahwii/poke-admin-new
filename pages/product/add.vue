<template>
    <Breadcrumb :pages="breadcrumbPages" />
  
    <div class="max-w-full mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Add Product</h2>
  
      <ProductForm v-model="product" :loading="loading" buttonText="Add Product" @submit="handleAddProduct" />
  
      <Transition name="slide-fade">
        <div v-if="showAlert" class="fixed top-20 right-4 w-64 z-10 bg-blue-50 p-3 shadow-md rounded-lg flex items-center">
        <InformationCircleIcon class="w-5 h-5 text-blue-400" />
          <p class="ml-2 text-xs text-blue-700 flex-1">{{ message }}</p>
          <button @click="showAlert = false" class="ml-4 text-xs font-medium text-blue-700 hover:text-blue-600">✕</button>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from "~/pages/product/stores/productStore";
  import Breadcrumb from "./components/Breadcrumb.vue";
  import ProductForm from "./components/ProductForm.vue";
  import { InformationCircleIcon } from '@heroicons/vue/20/solid';
  
  const router = useRouter();
  const productStore = useProductStore();
  const product = ref({ title: '', price: '', category: '', description: '', image: '' });
  const loading = ref(false);
  const showAlert = ref(false);
  const message = ref("Product successfully saved!");
  const errorMessage = ref("");
  
  const breadcrumbPages = [
    { name: 'Products', href: '/product' },
    { name: 'Add Product', href: '/product/add' }
  ];
  

const handleAddProduct = async (formData) => {
  if (loading.value) return;
  loading.value = true;
  
  try {
    const response = await productStore.addProduct(formData);
    if (response?.success) {
      showAlert.value = true;
      message.value = "Product successfully saved!";
      setTimeout(() => router.push("/product"), 2000);
    } else {
      throw new Error("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    showAlert.value = true;
    message.value = "Failed to save product. Please try again.";
  } finally {
    loading.value = false;
  }
};

  </script>

  