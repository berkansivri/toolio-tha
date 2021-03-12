const express = require('express')
const router = express.Router()

const ShopifyService = require('../service/shopify')

/* GET products listing. */
router.get('/', async (req, res) => {
  try {
    const products = await ShopifyService.getProducts(req.query)
    res.send(products)
  } catch (error) {
    res.sendStatus(error.response.status).send(await error.response.text())
  }
})

module.exports = router
