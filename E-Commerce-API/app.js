const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 1. As a user, I want to view a list of all products with their prices and supplier names.
app.get("/products", async function (req, res) {
  await db
    .query(
      "SELECT p.id AS product_id, p.product_name, pa.unit_price, pa.supp_id AS supplier_id FROM products p JOIN product_availability pa ON (p.id = pa.prod_id)"
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 2. As a user, I want to search for products by name.
app.get("/products/:name", function (request, response) {
  const partialName = "%" + request.params.name + "%"; // % to match any part of the name
  db.query("SELECT * FROM products WHERE product_name ILIKE $1", [partialName])
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json(error);
    });
});

// 3. As a user, I want to view a single customer by their ID.
app.get("/customers/:customerId", function (request, response) {
  const customerId = parseInt(request.params.customerId);
  db.query("SELECT * FROM customers WHERE id = $1", [customerId])
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});

module.exports = app;
