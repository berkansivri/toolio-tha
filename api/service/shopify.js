const fetch = require('node-fetch')

const { checkStatus } = require('../helper/HttpErrorHandler')

const { API_KEY, API_PASSWORD, STORE_NAME, API_VERSION } = process.env
const baseUrl = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`

module.exports = {
  async getProducts({ fields = '', title }) {
    const query = { limit: 250, fields }
    let allProducts = []

    let linkHeader

    do {
      const response = await fetch(
        `${baseUrl}/products.json?` + new URLSearchParams(query)
      )
      checkStatus(response)

      const { products } = await response.json()
      allProducts.push(...products)

      // get shopify response header named link and parse next page token inside
      linkHeader = response.headers.get('link')
      query.page_info = linkHeader
        .match(/page_info=(.*?)>/g)
        .pop()
        .slice(10, -1)

      // continue until there is no next page information in header
    } while (linkHeader.includes('rel="next"'))

    if (title) {
      allProducts = allProducts.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      )
    }

    return allProducts
  },

  async getProductsCount() {
    const response = await fetch(`${baseUrl}/products/count.json`)
    checkStatus(response)

    return await response.json()
  },
}
