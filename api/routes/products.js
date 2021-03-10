const express = require('express');
const router = express.Router();
const ShopifyService = require('../service/shopify');

/* GET products listing. */
router.get('/', async (req, res) => {
  try {
    const products = await ShopifyService.getProducts()
    res.send(products);
  } catch ({ response }) {
    res.status(response.status).send(await response.text())
  }
});

module.exports = router;
