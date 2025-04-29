const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database PostgreSQL (Neon): ', err);
    return;
  }
  console.log('Successfully connected to the database PostgreSQL (Neon)');
  release();
});

pool.on("error", (err) => {
  console.log("❌ Error connecting to PostgreSQL (Neon)", err);
  process.exit(-1);
});

module.exports = pool;
