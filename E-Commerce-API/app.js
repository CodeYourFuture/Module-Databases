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
app.get("/products/search", (req, res) => {
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

// As a user, I want to view a single customer by their ID.
// curl "http://127.0.0.1:3000/customers/1"
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE id = $1", [id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const customer = result.rows[0];
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: `Customer with id ${id} not found` });
      }
    }
  });
});

// As a user, I want to create a new customer with their name, address, city, and country.
// curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","address":"123 Main St","city":"New York","country":"USA"}' "http://127.0.0.1:3000/customers/"
app.post("/customers", (req, res) => {
  const { name, address, city, country } = req.body;
  db.query(
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, address, city, country],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const customer = result.rows[0];
        res.status(201).json(customer);
      }
    }
  );
});

// As a user, I want to create a new product.
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Basketball","description":"A ball used in basketball","supplierId":1}' "http://127.0.0.1:3000/products/"
app.post("/products", (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO products (product_name) VALUES ($1) RETURNING *",
    [name],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const product = result.rows[0];
        res.status(201).json(product);
      }
    }
  );
});

// As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
// curl -X POST -H "Content-Type: application/json" -d '{"price":100,"productId":1,"supplierId":1}' "http://127.0.0.1:3000/availability/"
app.post("/availability", (req, res) => {
  const { price, productId, supplierId } = req.body;
  db.query(
    "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
    [productId, supplierId, price],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const availability = result.rows[0];
        res.status(201).json(availability);
      }
    }
  );
});

//
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
