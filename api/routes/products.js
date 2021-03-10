const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const ShopifyService = require('../service/shopify')

/* GET products listing. */
router.get('/', cache('1 hour'), async (req, res) => {
  try {
    const products = await ShopifyService.getProducts(req.query)
    res.send(products)
  } catch ({ response }) {
    res.status(response.status).send(await response.text())
  }
})

module.exports = router
