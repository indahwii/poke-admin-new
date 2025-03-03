<template>
  <div class="bg-white">
    <nav class="flex mb-4" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 px-6">
        <li class="flex">
          <div class="flex items-center">
            <a href="/product" class="text-gray-400 hover:text-gray-500">
              <span>Home</span>
            </a>
          </div>
        </li>
        <li v-for="page in pages" :key="page.name" class="flex">
          <div class="flex items-center">
            <svg class="h-full w-6 shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a :href="page.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">
              {{ page.name }}
            </a>
          </div>
        </li>
      </ol>
    </nav>

    <div class="max-w-7xl px-6">
      <label for="berry-select" class="block text-sm font-medium text-gray-700 mb-2">
        Move to another Berry:
      </label>
      <div class="relative mt-1">
        <select
          id="berry-select"
          v-model="selectedBerry"
          @change="navigateToBerry"
          class="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option disabled selected>Move another berry</option>
          <option v-for="b in berryList" :key="b.name" :value="b.name">
            {{ b.name }}
          </option>
        </select>
        <ChevronDownIcon
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6 py-8">
      <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200 lg:flex lg:items-center lg:gap-x-8">
        <div class="flex-shrink-0">
          <img :src="berryImageUrl" :alt="berry.name" class="aspect-square w-48 rounded-lg object-cover" />
        </div>

        <div class="mt-6 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">
            {{ berry.name }} Berry
          </h1>
          <section aria-labelledby="information-heading" class="mt-3">
            <h2 id="information-heading" class="sr-only">Berry Information</h2>
            <div class="mt-3 space-y-5">
              <p class="text-base text-gray-500">Firmness: {{ berry.firmness?.name }}</p>
              <p class="text-base text-gray-500">Growth Time: {{ berry.growth_time }} days</p>
              <p class="text-base text-gray-500">Max Harvest: {{ berry.max_harvest }}</p>
              <p class="text-base text-gray-500">Size: {{ berry.size }} mm</p>
              <p class="text-base text-gray-500">Smoothness: {{ berry.smoothness }}</p>
              <p class="text-base text-gray-500">Soil Dryness: {{ berry.soil_dryness }}</p>
              <p class="text-base text-gray-500">Natural Gift Power: {{ berry.natural_gift_power }}</p>
              <p class="text-base text-gray-500">Natural Gift Type: {{ berry.natural_gift_type?.name }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const route = useRoute();
const router = useRouter();
const berry = ref({});
const loading = ref(true);
const berryImageUrl = ref('');
const selectedBerry = ref('');
const berryList = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/berry/${route.params.id}/`);
    berry.value = data;
    berryImageUrl.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.item.name}.png`;

    const berryResponse = await axios.get('https://pokeapi.co/api/v2/berry?limit=10');
    berryList.value = berryResponse.data.results;

  } catch (error) {
    console.error("Error fetching berry details:", error);
  } finally {
    loading.value = false;
  }
});

const navigateToBerry = () => {
  if (selectedBerry.value) {
    router.push(`/product/${selectedBerry.value}`);
  }
};

const pages = [
  { name: 'Products', href: '/product', current: false },
  { name: route.params.id, href: '#', current: true },
];
</script>
