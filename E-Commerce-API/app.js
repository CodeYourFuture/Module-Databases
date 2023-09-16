// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { Pool } = require("pg");
app.use(express.json());

module.exports = app;

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/products", (req, res) => {
  db.query(
    'SELECT p.product_name AS name, pa.unit_price AS price, s.supplier_name AS "supplierName" FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN suppliers s ON ( pa.supp_id = s.id)'
  )
    .then((result) => {
      console.log(result.rows);
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
