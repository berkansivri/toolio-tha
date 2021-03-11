const express = require('express')
const router = express.Router()
// const cache = require('apicache').middleware

const ShopifyService = require('../service/shopify')

/* GET products listing. */
router.get('/', async (req, res) => {
  try {
    const products = await ShopifyService.getProducts(req.query)
    res.send(products)
  } catch ({ response }) {
    res.sendStatus(response.status).send(await response.text())
  }
})

router.get('/count', async (_, res) => {
  try {
    const count = await ShopifyService.getProductsCount()
    res.send(count)
  } catch ({ response }) {
    res.sendStatus(response.status).send(await response.text())
  }
})

module.exports = router
