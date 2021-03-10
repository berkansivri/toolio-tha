const fetch = require('node-fetch')
const { checkStatus } = require('../helper/HttpErrorHandler')

const { API_KEY, API_PASSWORD, SHOPIFY_URL } = process.env
const baseUrl = `https://${API_KEY}:${API_PASSWORD}@${SHOPIFY_URL}/admin/api`

module.exports = {
  async getProducts() {
    const response = await fetch(`${baseUrl}/2019-10/products.json`)
    checkStatus(response)

    return await response.json()
  }
}