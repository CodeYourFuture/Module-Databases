const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function connect() {
  await db.connect();
  console.log('Connected to Postgres database');
}

async function end() {
  if (db) {
    await db.end();
    console.log('Disconnected from Postgres database');
  }
}

async function query(sql, params = []) {
  const result = await db.query(sql, params);
  return result;
}

module.exports = { connect, end, query };