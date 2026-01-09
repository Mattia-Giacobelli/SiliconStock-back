const connection = require("../data/db");

// category index
function categoryIndex(req, res) {
  const slug = req.params.slug;

  const sql = 'SELECT * FROM categories JOIN products ON categories.id = products.category_id WHERE categories.slug = ?'

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

module.exports = { categoryIndex, show };
