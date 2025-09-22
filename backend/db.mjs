import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function initDB() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log("✅ Connection successful!");
    return db;
  } catch (err) {
    console.log("❌ Connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
}

// Export a promise of the DB connection
export const db = initDB();
