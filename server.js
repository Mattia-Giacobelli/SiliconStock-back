const express = require('express')
const app = express()
const PORT = 3000

//Orders router
const ordersRouter = require('./routers/ordersRouter')

//Products router
const productsRouter = require('./routers/products')


// Error 500
const errorsHandler = require('./middlewares/errorsHandler')
// Error 404
const notFound = require('./middlewares/notFound')

//Register the body parser
app.use(express.json())

//Cors authorization
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('SiliconStock db')
})

//Products router
app.use('/api/products', productsRouter)

//Orders router
app.use('/api/orders', ordersRouter)

// Error 500
app.use(errorsHandler)

// Error 404
app.use(notFound)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})