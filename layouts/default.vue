<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-lg font-semibold text-gray-900">{{ $t("products.dashboard") }}</h1>
        
        <div class="flex items-center gap-4">
          <Listbox as="div" v-model="selectedLanguage">
            <div class="relative">
              <ListboxButton class="flex items-center gap-2 cursor-pointer rounded-md bg-white px-4 py-2 text-gray-900 border border-gray-300">
                <img :src="selectedLanguage.flag" alt="" class="w-5 h-5" />
                <span>{{ selectedLanguage.name }}</span>
                <ChevronUpDownIcon class="w-5 h-5 text-gray-500" aria-hidden="true" />
              </ListboxButton>

              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute right-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg rounded-md py-1 text-sm">
                  <ListboxOption as="template" v-for="lang in languages" :key="lang.code" :value="lang" v-slot="{ active, selected }">
                    <li 
                      @click="changeLanguage(lang.code)"
                      :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-pointer flex items-center gap-2 px-4 py-2']">
                      <img :src="lang.flag" alt="" class="w-5 h-5" />
                      <span :class="[selected ? 'font-semibold' : 'font-normal']">{{ lang.name }}</span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>

          <button
            @click="logout"
            class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-500"
          >
            {{ $t("logout") }}
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-auto p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronUpDownIcon } from '@heroicons/vue/16/solid';

const { locale } = useI18n();

const { t } = useI18n();

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'id', name: 'Bahasa Indonesia', flag: 'https://flagcdn.com/w40/id.png' }
];

const selectedLanguage = ref(languages.find(lang => lang.code === locale.value) || languages[0]);

const changeLanguage = (langCode) => {
  locale.value = langCode;
  selectedLanguage.value = languages.find(lang => lang.code === langCode);
};

const logout = () => {
  console.log("Logging out...");
};
</script>
