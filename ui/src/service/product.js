const baseUrl = `${process.env.VUE_APP_API_URL}/products`

export default {
  async getProducts(query) {
    const params = new URLSearchParams(query)
    params.forEach((v, k) => {
      if (v === '') params.delete(k)
    })

    const response = await fetch(`${baseUrl}?${params}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products: ' + response.statusText)
    }

    return await response.json()
  },
}
