const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET "/products"
app.get("/products", async (req, res) => {
  try {
    const { name } = req.query;

    let query = `
      SELECT p.product_name as name, pa.unit_price as price, s.supplier_name as supplierName
      FROM products p
      INNER JOIN product_availability pa ON (p.id = pa.prod_id)
      INNER JOIN suppliers s ON (pa.supp_id = s.id)
    `;

    if (name) {
      query += ` WHERE LOWER(p.product_name) LIKE LOWER('%${name}%')`;
    }
    const result = await db.query(query);
    const products = result.rows;

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get customer by ID
app.get("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const query = `
      SELECT *
      FROM customers
      WHERE customer_id = $1
    `;

    const result = await db.query(query, [customerId]);
    const customer = result.rows[0];

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/customers", async (req, res) => {
  const { name, address, city, country } = req.body;

  try {
    const query = `
      INSERT INTO customers (name, address, city, country)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await db.query(query, [name, address, city, country]);
    const newCustomer = result.rows[0];

    res.status(201).json(newCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
