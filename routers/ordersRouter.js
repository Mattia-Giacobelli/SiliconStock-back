const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

//Store order
router.post('/newOrder', ordersController.storeOrder)

//Payment intent
router.post('/create-payment-intent', ordersController.paymentIntent)


module.exports = router