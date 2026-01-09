const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

//category Index
router.get('/:slug', productController.categoryIndex)

// show
router.get('/:slug', productController.show)

module.exports = router