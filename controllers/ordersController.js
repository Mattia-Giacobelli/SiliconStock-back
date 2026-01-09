const connection = require("../data/db");

//orders Store
function storeOrder(req, res) {

    const id = Date.now()

    const { first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id, products } = req.body
    console.log(req.body);


    //Store order query
    const sql = 'INSERT INTO orders (id, first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id) VALUES (?,?,?,?,?,?,?,?)'

    // //Update pivot table
    const pivotSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?,?,?)'

    //Add validation for blank fields and incorrect data
    if (first_name === "") {
        return res.json({ status: 400, error: "First name field can't be empty" })
    } else if (last_name === "") {
        return res.json({ status: 400, error: "Last name field can't be empty" })
    } else if (phone === "" || Number(phone) === NaN || phone.length < 10 || phone.length > 13) {
        return res.json({ status: 400, error: "Phone field can't be empty and must be a valid number" })
    } else if (!email.includes('@')) {
        return res.json({ status: 400, error: "Provide a valid email" })
    } else if (shipping_address === "") {
        return res.json({ status: 400, error: "Shipping address field can't be empty" })
    }

    connection.query(sql, [id, first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })

        products.forEach(product => {
            connection.query(pivotSql, [id, product.id, product.quantity], (err, results) => {
                if (err) return res.status(500).json({ error: true, message: err.message })
            })
        })

        res.status(201).json({ request: "received", id: results })
    })
}


module.exports = { storeOrder };