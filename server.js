require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//Orders router
const ordersRouter = require("./routers/ordersRouter");

//Products router
const productsRouter = require("./routers/productsRouter");

//Chatbot router
const chatbotRouter = require("./routers/chatbotRouter")

// Error 500
const errorsHandler = require("./middlewares/errorsHandler");
// Error 404
const notFound = require("./middlewares/notFound");

//Register the body parser
app.use(express.json());

//Cors authorization
const cors = require("cors");

app.use(
  cors({
    origin: "https://siliconstock-front.giacobelli-mattia12.workers.dev/",
    "localhost"
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("SiliconStock db");
});

//Products router
app.use("/api/products", productsRouter);

//Orders router
app.use("/api/orders", ordersRouter);

//Chatbot router
app.use("/api/chat", chatbotRouter)

// Error 500
app.use(errorsHandler);

// Error 404
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
