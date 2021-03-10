const baseUrl = `${process.env.VUE_APP_API_URL}/products?`;

export default {
  async getProducts(query) {
    const response = await fetch(baseUrl + new URLSearchParams(query));
    return await response.json();
  },
};
