import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en', 
    messages: {
      en: {
        products: {
          dashboard: "Dashboard",
          title: "Products",
          description: "A list of all products including name, category, price, and actions.",
          addProduct: "Add Product",
          searchPlaceholder: "Search products...",
          loading: "Loading products...",
          number: "Number",
          name: "Name",
          action: "Actions"
        }
      },
      id: {
        products: {
          dashboard: "Dashboard",
          title: "Produk",
          description: "Daftar semua produk termasuk nama, kategori, harga, dan aksi.",
          addProduct: "Tambah Produk",
          searchPlaceholder: "Cari produk...",
          loading: "Memuat produk...",
          number: "Nomor",
          name: "Nama",
          action: "Aksi"
        }
      }
    }
  });

  nuxtApp.vueApp.use(i18n);
});
