<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="12" lg="8">
        <v-card>
          <v-card-title>
            Shopify Products
            <v-spacer />
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              single-line
              placeholder="Press 'enter' to search"
              @keydown.enter="query.title = $event.target.value"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="products"
            :loading="isLoading"
            :footer-props="{
              itemsPerPageOptions,
            }"
            :page.sync="query.page"
            :items-per-page.sync="query.limit"
            :server-items-length="totalProducts"
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
import productService from '@/service/product.js'

export default {
  name: 'Products',
  data: () => ({
    isLoading: false,
    error: '',
    products: [],
    itemsPerPageOptions: [10, 20, 30, 40, 50, -1],
    totalProducts: -1,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
        width: '200',
      },
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title',
      },
    ],
    query: {
      fields: ['id', 'title'],
      title: '',
      limit: 10,
      page: 1,
    },
  }),
  methods: {
    async getProducts() {
      this.error = ''
      this.isLoading = true

      try {
        const { items, count } = await productService.getProducts(this.query)

        this.products = items
        this.totalProducts = count
      } catch (error) {
        this.error = error.message
      }

      this.isLoading = false
    },
  },
  watch: {
    query: {
      handler() {
        this.getProducts()
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
