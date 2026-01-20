const connection = require("../data/db");

// products index
function index(req, res) {
  const slug = req.params.slug;

  const searchValue = req.query.searchValue
  const filter = req.query.filter

  console.log(searchValue, filter);


  let sql

  if (filter && filter === 'asc') {
    sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY price'
  } else if (filter && filter === 'desc') {
    sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY price DESC'
  }
  else if (filter === '') {
    sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id'
  } else if (searchValue !== '') {
    if (filter === 'asc' || filter === '') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name'
    } else if (filter && filter === 'desc') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name DESC'
    }
  } else if (filter && filter === 'new') {
    sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at DESC`
  } else if (filter && filter === 'old') {
    sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at`
  }

  connection.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Products not found" });

    let filteredResults

    if (searchValue) {

      filteredResults = results.filter(result => result.product_name.toLowerCase().includes(searchValue) || result.description.toLowerCase().includes(searchValue) || result.category_name.toLowerCase().includes(searchValue))
    } else if (!searchValue) {

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

  const sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug"  FROM products WHERE slug = ?';

  connection.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
}

module.exports = { index, categoryIndex, show };
