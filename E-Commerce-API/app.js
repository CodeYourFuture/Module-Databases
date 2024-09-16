const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.get("/products", async (req, res) => {
  const query =
    "SELECT product_name as name, unit_price as price, supplier_name as supplierName FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)";
  try {
    const result = await db.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching videos" });
  }
});

app.get("/products/search", async (req, res) => {
  try {
    const { name } = req.query;
    const query = "SELECT * FROM products WHERE product_name LIKE $1 ";
    const searchName = `%${name}%`;

    const result = await db.query(query, [searchName]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/customers", async (req, res) => {
  const query = "SELECT * FROM customers";
  try {
    const result = await db.query(query);
    const videos = result.rows;
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching videos" });
  }
});
app.post("/customers", async (req, res) => {
  try {
    const { name, address, city, country } = req.body;
    const query =
      "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
    const result = await db.query(query, [name, address, city, country]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "error",
      message: "Internal server error",
    });
  }
});
module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}`));
