const fetch = require('node-fetch')

const { checkStatus } = require('../helper/HttpErrorHandler')

const { API_KEY, API_PASSWORD, STORE_NAME, API_VERSION } = process.env
const baseUrl = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`

module.exports = {
  async getProducts({ fields = '', title }) {
    const response = await fetch(
      `${baseUrl}/products.json?` + new URLSearchParams({ fields })
    )
    checkStatus(response)

    let { products } = await response.json()

    if (title) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      )
    }

    return products
  },
}
