const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

//products Index
router.get('/', productController.index)

//category Index
router.get('/category/:slug', productController.categoryIndex)

// show
router.get('/:slug', productController.show)

module.exports = router