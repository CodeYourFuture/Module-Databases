const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://admin:3214@localhost:5432/cyf_ecommerce",
  connectionTimeoutMillis: 5000,
  ssl: false,
});

const connectDB = async () => {
  if (!pool) {
    return;
  }

  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log(`postgres connected to ${client.database} on port 5432`);
  client.release();
};

const disconnectDb = () => {
  if (!pool) {
    return;
  }
  pool.end();
};

module.exports = {
  connectDB,
  disconnectDb,
  query: (...args) => {
    if (!pool) {
      return;
    }
    return pool.query.apply(pool, args);
  },
};
