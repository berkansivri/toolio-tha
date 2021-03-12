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

router.get('/count', async (_, res) => {
  try {
    const count = await ShopifyService.getProductsCount()
    res.send(count)
  } catch (error) {
    res.sendStatus(error.response.status).send(await error.response.text())
  }
})

module.exports = router
