const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

//Store order
router.post('/newOrder', ordersController.storeOrder)

//Payment intent
router.post('/create-payment-intent', ordersController.paymentIntent)

//Send order confirmation email
router.post('/send-email', ordersController.sendEmail)

//Get discount code value
router.get('/discount-code', ordersController.getDiscountValue)



module.exports = router