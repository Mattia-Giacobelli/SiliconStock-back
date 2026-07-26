const db = require("../data/db");

// products index
async function index(req, res) {
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
    if (filter === 'name-asc' || filter === '') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name'
    } else if (filter && filter === 'name-desc') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name DESC'
    } else if (filter && filter === 'new') {
      sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at DESC`
    } else if (filter && filter === 'old') {
      sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at`
    } if (filter && filter === 'asc') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY price'
    } else if (filter && filter === 'desc') {
      sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY price DESC'
    }
  } else if (filter && filter === 'new') {
    sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at DESC`
  } else if (filter && filter === 'old') {
    sql = `SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.created_at`
  } if (filter === 'name-asc' || filter === '') {
    sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name'
  } else if (filter && filter === 'name-desc') {
    sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id ORDER BY products.name DESC'
  }

  try {
    const [results] = await db.query(sql, [slug]);

    // check results
    if (results.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    let filteredResults = results;

    // filter results
    if (searchValue) {
      const search = searchValue.toLowerCase();

      filteredResults = results.filter(result =>
        (result.product_name && result.product_name.toLowerCase().includes(search)) ||
        (result.description && result.description.toLowerCase().includes(search)) ||
        (result.category_name && result.category_name.toLowerCase().includes(search))
      );
    }

    res.json(filteredResults);

  } catch (err) {
    console.error("Errore durante il recupero dei prodotti:", err);
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
}

// category index
async function categoryIndex(req, res) {
  const slug = req.params.slug;

  const sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id WHERE categories.slug = ?'

  try {
    const [results] = await db.query(sql, [slug]);

    // check results
    if (results.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.json(results);

  } catch (err) {
    console.error("Errore durante l'esecuzione della query:", err);
    // Se la query va in errore, rispondi con uno status 500 senza far crashare la connessione
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
}

// show
async function show(req, res) {

  const slug = req.params.slug;

  const sql = 'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price FROM products WHERE slug = ?';

  try {
    const [results] = await db.query(sql, [slug]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);

  } catch (err) {
    console.error("Errore durante il recupero del prodotto:", err);
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
}

module.exports = { index, categoryIndex, show };
