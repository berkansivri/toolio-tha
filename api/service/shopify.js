const fetch = require('node-fetch')
var cache = require('memory-cache')

const { checkStatus } = require('../helper/HttpErrorHandler.js')
const { applyQueryToItems } = require('../helper/Query.js')

const {
  API_KEY,
  API_PASSWORD,
  STORE_NAME,
  API_VERSION,
  CACHE_DURATION,
} = process.env
const baseUrl = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`

async function getProducts(query) {
  const products = cache.get('products') || (await getAllItems('products'))

  return applyQueryToItems(products, query)
}

// get all items with cursor-based pagination from shopify api
async function getAllItems(item) {
  if (!item) return

  const allItems = []
  const query = new URLSearchParams({ limit: 250 }) // max limit of shopify api
  let response

  do {
    response = await fetch(`${baseUrl}/${item}.json?${query}`)
    checkStatus(response)

    const { [item]: items } = await response.json()
    allItems.push(...items)

    query.set('page_info', getNextPageToken(response))
    // continue until there is no next page information in header
  } while (hasNextPage(response))

  cache.put(item, allItems, (CACHE_DURATION || 30) * 60 * 1000) // timeout(ms) converting to minute

  return allItems
}

// get the next page token (page_info) from response header of shopify api
function getNextPageToken(response) {
  return response.headers
    .get('link')
    .match(/page_info=(.*?)>/g)
    .pop()
    .slice(10, -1)
}

function hasNextPage(response) {
  return response.headers.get('link').includes('rel="next"')
}

module.exports = {
  getProducts,
}
