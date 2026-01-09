const express = require('express')
const app = express()
const PORT = 3000
// Error 500
const errorsHandler = require('./middlewares/errorsHandler')
// Error 404
const notFound = require('./middlewares/notFound')

const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('SiliconStock db')
})

// Error 500
app.use(errorsHandler)

// Error 404
app.use(notFound)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})