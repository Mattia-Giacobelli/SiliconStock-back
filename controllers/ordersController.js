const connection = require("../data/db");
const validator = require("validator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendOrderEmail = require("../services/sendOrderEmail");

let mail
let orderId


//orders Store
function storeOrder(req, res) {


    const { order } = req.body
    console.log(req.body);


    //Store order query
    const sql = 'INSERT INTO orders (id, first_name, last_name, phone, email, shipping_address, total_amount, discount_code_id) VALUES (?,?,?,?,?,?,?,?)'

    // //Update pivot table
    const pivotSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?,?,?)'

    //Add validation for blank fields and incorrect data

    const normalizedEmail = validator.normalizeEmail(order.email);

    if (order.first_name === "") {
        return res.json({ status: 400, error: "First name field can't be empty" })
    } else if (order.last_name === "") {
        return res.json({ status: 400, error: "Last name field can't be empty" })
    } else if (order.phone === "" || order.phone.length < 10 || order.phone.length > 13) {
        return res.json({ status: 400, error: "Phone field can't be empty and must be a valid number" })
    } else if (!validator.isEmail(order.email) || !normalizedEmail) {
        return res.json({ status: 400, error: "Provide a valid email" })
    } else if (order.shipping_address === "") {
        return res.json({ status: 400, error: "Shipping address field can't be empty" })
    }

    mail = order.email
    orderId = order.id

    connection.query(sql, [order.id, order.first_name, order.last_name, order.phone, order.email, order.shipping_address, order.total_amount, order.discount_code_id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })



        order.products.forEach(product => {
            connection.query(pivotSql, [order.id, product.id, product.quantity], (err, results) => {
                if (err) return res.status(500).json({ error: true, message: err.message })
            })
        })

        res.status(201).json({ request: "received", id: results })
    })
}


async function paymentIntent(req, res) {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ error: "Products non validi" });
        }

        const calculateOrderAmount = (items) => {
            return items.reduce((total, item) => {
                const price = Number(item.price
                );

                if (isNaN(price)) {
                    throw new Error("Prezzo non valido");
                }

                return total + Math.round(price * 100);
            }, 0);
        };

        const amount = calculateOrderAmount(products);

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Importo non valido" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            payment_method_types: ["card"],
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Stripe error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


//Send email confirmation

async function sendEmail(req, res) {
    const { order } = req.body
    console.log(req.body);


    await sendOrderEmail(order.email, order);
    console.log('prima');

}


module.exports = { storeOrder, paymentIntent, sendEmail };