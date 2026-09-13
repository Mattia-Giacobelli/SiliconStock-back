const mysql = require("mysql2/promise");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// 2. Scegli se usare il socket UNIX o IP/Porta
if (process.env.DB_HOST && process.env.DB_HOST.startsWith('/cloudsql/')) {
  dbConfig.socketPath = process.env.DB_HOST;
} else {
  dbConfig.host = process.env.DB_HOST;
  dbConfig.port = process.env.DB_PORT || 3306;
}

// 3. Crea il pool con la configurazione corretta
const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connessione al database MySQL riuscita!");
    connection.release();
  } catch (err) {
    console.error("Errore di connessione al database MySQL:", err.message);
  }
})();

module.exports = pool;
