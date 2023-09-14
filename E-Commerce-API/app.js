const express = require("express");
const app = express();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

///////////// What database should I use here?

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

module.exports = app;
