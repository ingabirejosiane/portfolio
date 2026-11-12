import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const schemaPath = path.resolve(__dirname, '../../schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    console.log('Running schema.sql ...');
    await conn.query(sql);
    console.log('Database and tables are ready.');
    console.log('Seed data inserted (only if tables were empty).');
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('Database setup failed:');
  console.error(err.message);
  process.exit(1);
});
