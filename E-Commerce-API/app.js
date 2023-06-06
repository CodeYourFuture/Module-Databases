const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj
app.get("/products", async (req, res) => {
  await db
    .query(
      `SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
FROM products
JOIN product_availability ON products.id = product_availability.prod_id
JOIN suppliers ON product_availability.supp_id = suppliers.id`
    )
    .then((result) => {
      res.json(
        result.rows.map((row) => ({
          name: row.product_name,
          price: row.unit_price,
          supplierName: row.supplier_name,
        }))
      );
    })
    .catch((error) => {
      console.log(error);
    });
});
//   res.json([
//     {
//       name: " ",
//       price: 0,
//       supplierName: "",
//     },
//   ]);
// });

module.exports = app;
