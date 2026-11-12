import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

export async function testConnection() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
    console.log(`Connected to MySQL database "${process.env.DB_NAME || 'portfolio'}"`);
  } finally {
    conn.release();
  }
}
