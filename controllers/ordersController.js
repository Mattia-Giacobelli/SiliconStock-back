const connection = require("../data/db");

//orders Store
function storeOrder(req, res) {

    const { first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id } = req.body
    console.log(req.body);

    //Store review query
    const sql = 'INSERT INTO orders (first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id) VALUES (?,?,?,?,?,?,?)'


    //Add validation for blank fields and incorrect data
    if (first_name === "") {
        return res.json({ status: 400, error: "First name field can't be empty" })
    } else if (last_name === "") {
        return res.json({ status: 400, error: "Last name field can't be empty" })
    } else if (phone === "" || Number(phone) === NaN) {
        return res.json({ status: 400, error: "Phone field can't be empty and must be a number" })
    } else if (!email.includes('@')) {
        return res.json({ status: 400, error: "Provide a valid email" })
    } else if (shipping_address === "") {
        return res.json({ status: 400, error: "Shipping address field can't be empty" })
    }

    connection.query(sql, [first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })

        res.status(201).json({ request: "received", id: results })
    })
}


module.exports = { storeOrder };