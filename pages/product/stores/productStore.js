import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    pagination: {
      totalPages: 1,
      currentPage: 1,
      perPage: 10,
    },
    allBerries: [],
    searchQuery: "",
  }),

  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/berry?limit=100");
        this.allBerries = response.data.results;
        this.updateFilteredProducts();
      } catch (error) {
        console.error("Error fetching berries:", error);
      }
    },

    setPage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.pagination.currentPage = page;
        this.updateFilteredProducts();
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query.toLowerCase();
      this.pagination.currentPage = 1;
      this.updateFilteredProducts();
    },

    async addProduct(newProduct) {
      try {
        const response = await axios.post("https://fakestoreapi.com/products", newProduct);

        this.products.unshift(response.data); 

        return { success: true, message: "Product added successfully!" };
      } catch (error) {
        console.error("Error adding product:", error);
        return { success: false, message: "Failed to add product" };
      }
    },

    updateFilteredProducts() {
      let filteredData = this.allBerries;

      if (this.searchQuery) {
        filteredData = this.allBerries.filter((berry) =>
          berry.name.toLowerCase().includes(this.searchQuery)
        );
      }

      this.pagination.totalPages = Math.ceil(filteredData.length / this.pagination.perPage);

      const start = (this.pagination.currentPage - 1) * this.pagination.perPage;
      const end = start + this.pagination.perPage;
      this.products = filteredData.slice(start, end);
    },
  },
});
