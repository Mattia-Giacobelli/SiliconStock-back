const express = require('express')
const app = express()
const PORT = 3000

const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('SiliconStock db')
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})