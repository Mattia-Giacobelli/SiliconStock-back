const express = require('express')
const router = express()
const productController = require('../controllers/productController')

// show
router.get('/:slug', productController.show)

module.exports = router