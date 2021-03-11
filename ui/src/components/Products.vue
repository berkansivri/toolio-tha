<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="12" lg="8">
        <v-card>
          <v-card-title>
            Shopify Products
            <v-spacer />
            <v-text-field
              v-model="query.title"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              placeholder="Press 'enter' to search"
              @keydown.enter="getProducts"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="products"
            :loading="isLoading"
          />
        </v-card>
      </v-col>
      <v-snackbar
        :timeout="3000"
        :value="!!error"
        absolute
        right
        top
        color="error"
        rounded="pill"
        elevation="20"
      >
        <strong>{{ error }}</strong>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import productService from "@/service/product";

export default {
  name: "Products",
  data: () => ({
    isLoading: false,
    error: "",
    products: [],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
        width: "200",
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
      try {
        this.products = await productService.getProducts(this.query);
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>
