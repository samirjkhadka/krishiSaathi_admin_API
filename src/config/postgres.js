const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL (Neon)");
});

pool.on("error", (err) => {
  console.log("❌ Error connecting to PostgreSQL (Neon)", err);
});

module.exports = pool;
