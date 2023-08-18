const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/products", (req, res) => {
  db.query(
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products AS p INNER JOIN product_availability AS pa ON p.id = pa.prod_id INNER JOIN suppliers AS s ON pa.supp_id = s.id"
  )
    .then((result) => {
      const productList = result.rows.map((row) => ({
        name: row.product_name,
        price: row.unit_price,
        supplierName: row.supplier_name,
      }));
      res.status(200).json(productList);
    })
    .catch((error) =>
      res.status(500).json({
        message: error.message,
      })
    );
});

app.get("/products/:name", (req, res) => {
  const productName = req.params.name;
  console.log(productName);
  db.query("SELECT * FROM products WHERE product_name LIKE '%' || $1 || '%'", [
    productName,
  ])
    .then((result) => {
      const productList = result.rows.map((row) => ({
        name: row.product_name,
      }));
      res.status(200).json(productList);
    })
    .catch((error) =>
      res.status(500).json({
        message: error.message,
      })
    );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening. Ready to accept requests!`);
});

module.exports = app;
