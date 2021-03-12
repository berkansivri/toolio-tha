const fetch = require('node-fetch')
var cache = require('memory-cache')

const { checkStatus } = require('../helper/HttpErrorHandler')
const { applyQueryToItems } = require('../helper/Query')

const {
  API_KEY,
  API_PASSWORD,
  STORE_NAME,
  API_VERSION,
  CACHE_DURATION,
} = process.env
const baseUrl = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`

// get all products with cursor-based pagination from shopify api
async function getAllProducts() {
  const allProducts = []
  const query = { limit: 250 }
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

  cache.put('products', allProducts, CACHE_DURATION * 60 * 1000)

  return allProducts
}

async function getProducts(query) {
  const products = cache.get('products') || (await getAllProducts())

  return applyQueryToItems(products, query)
}

module.exports = {
  getProducts,
}
