const connection = require("../data/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chatbot(req, res) {
  const { message, singleProduct, slug } = req.body;
  const sql =
    'SELECT products.id, products.name AS "product_name", products.slug AS "product_slug", products.description, products.technical_specs, products.img, products.price, categories.name AS "category_name", categories.slug AS "category_slug" FROM categories JOIN products ON categories.id = products.category_id';
  const sqlShow = "SELECT * FROM products WHERE slug = ?";
  try {
    let prompt;
    if (singleProduct === "current product") {
      const [product] = await connection.promise().query(sqlShow, [slug]);

      if (!product || product.length === 0) {
        return res
          .status(404)
          .json({ error: "No products found for this category." });
      }

      prompt = `Sei un agente sotto copertura di nome Fabrizio, parla in codice. 
    Ecco i prodotti disponibili nel nostro catalogo: ${JSON.stringify(product)}.
    Rispondi in italiano alla seguente domanda dell'utente, usando i dati dei prodotti sopra elencati: ${message}`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ reply: text });
    } else if (singleProduct === "product comparison") {
      const [products] = await connection.promise().query(sql);

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ error: "No products found for this category." });
      }

      prompt = `Sei un agente sotto copertura di nome Fabrizio, parla in codice. 
    Ecco i prodotti disponibili nel nostro catalogo: ${JSON.stringify(
      products
    )}.
    Rispondi in italiano alla seguente domanda dell'utente, usando i dati dei prodotti sopra elencati: ${message}`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ reply: text });
    }
  } catch (error) {
    console.error("Errore Gemini API:", error);
    res
      .status(500)
      .json({ error: "Errore durante la generazione della risposta" });
  }
}

module.exports = chatbot;
