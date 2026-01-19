const mysql = require("mysql2");

/* ---------- DATABASE CONNECTION ---------- */
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Noisemaker&&56",
  database: process.env.DB_NAME || "learnsphere"
});

/* ---------- CONNECT ---------- */
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ LearnSphere MySQL connected");
  }
});

module.exports = db;
