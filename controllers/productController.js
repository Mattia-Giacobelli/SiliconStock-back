const connection = require("../data/db");

// products index
function index(req, res) {
  const slug = req.params.slug;

  const search = req.query.search;

  const sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id'

  connection.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Products not found" });

    let filteredResults

    if (search) {

      filteredResults = results.filter(result => result.product_name.toLowerCase().includes(search) || result.description.toLowerCase().includes(search) || result.category_name.toLowerCase().includes(search))
    } else if (!search) {

      filteredResults = results
    }

    res.json(filteredResults)
  })
}

// category index
function categoryIndex(req, res) {
  const slug = req.params.slug;

  const sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id WHERE categories.slug = ?'

  connection.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Products not found" });
    res.json(results)
  })
}

// show
function show(req, res) {
  const slug = req.params.slug;

  const sql = "SELECT * FROM products WHERE slug = ?";

  connection.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
}

module.exports = { index, categoryIndex, show };
