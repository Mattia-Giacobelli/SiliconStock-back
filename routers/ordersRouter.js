const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

//Store order
router.post('/newOrder', ordersController.storeOrder)


module.exports = router