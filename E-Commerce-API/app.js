const express = require("express");
const app = express();
require("dotenv").config();

const port = 3000;

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

// As a user, I want to view a list of all products with their prices and supplier names.
// curl "http://127.0.0.1:3000/products/"
app.get("/products", (req, res) => {
  db.query(
    "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name as supplierName FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)",
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const products = result.rows.map(({ name, price, suppliername }) => ({
          name,
          price,
          supplierName: suppliername,
        }));
        res.status(200).json(products);
      }
    }
  );
});

// As a user, I want to search for products by name.
// curl "http://127.0.0.1:3000/products/search?name=ball"
app.get("/products/search", function (req, res) {
  const { name } = req.query;
  db.query(
    "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name as supplierName FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id) WHERE p.product_name ILIKE $1",
    [`%${name}%`],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const products = result.rows.map(({ name, price, suppliername }) => ({
          name,
          price,
          supplierName: suppliername,
        }));
        res.status(200).json(products);
      }
    }
  );
});

module.exports = app;

// Start the server and export the server instance
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(port, () => {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
  });

  // Attach the error event listener to the server instance
  server.on("error", (err) => {
    console.error("Failed to start server:", err);
  });

  module.exports.server = server;
}
