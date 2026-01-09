const connection = require("../data/db");

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

module.exports = { show };
