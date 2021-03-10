<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Shopify Products
            <v-spacer />
            <v-text-field
              v-model="query.title"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              placeholder="Press 'enter' to search"
              @keydown.enter="getProducts"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="products"
            :options.sync="options"
            :items-per-page="5"
            :loading="isLoading"
            :server-items-length="totalProducts"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productService from "@/service/product";

export default {
  name: "Products",

  data: () => ({
    isLoading: false,
    totalProducts: 5,
    options: {},
    products: [],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
    ],
    query: {
      fields: ["id", "title"],
      title: "",
    },
  }),
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      this.products = await productService.getProducts(this.query);
      this.isLoading = false;
    },
  },
  watch: {
    options: {
      handler() {
        this.getProducts();
      },
      deep: true,
    },
  },
};
</script>
