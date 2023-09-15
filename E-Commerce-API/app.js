const express = require("express");
const app = express();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const { Pool } = require("pg");
const bodyParser = require("body-parser");
const CORS = require("cors");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: "coder",
  password: "glasgow321!",
  host: "localhost",
  database: "cyf_ecommerce",
  port: 5432,
});

app.get("/products", (req, res) => {
  const allProducts = async () => {
    try {
      const result = await pool.query(
        "SELECT  p.product_name as name, s.unit_price as price, s.supplier_name as supplierName FROM (SELECT * FROM suppliers FULL OUTER JOIN product_availability as pa ON suppliers.id = pa.supp_id ) as s FULL OUTER JOIN products as p ON s.prod_id = p.id"
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  allProducts();
});
//
app.get("/products/:name", (req, res) => {
  const singleProduct = async () => {
    try {
      const result = await pool.query(
        "SELECT  p.product_name as name, s.unit_price as price, s.supplier_name as supplierName FROM (SELECT * FROM suppliers FULL OUTER JOIN product_availability as pa ON suppliers.id = pa.supp_id ) as s FULL OUTER JOIN products as p ON s.prod_id = p.id WHERE p.product_name ILIKE $1",
        [req.params.name]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  singleProduct();
});
//
app.get("/customers/:customerId", (req, res) => {
  const customerId = async () => {
    try {
      const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
        req.params.customerId,
      ]);
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  customerId();
});
//
app.post("/customers", (req, res) => {
  const newCustomer = async () => {
    try {
      await pool.query(
        "INSERT INTO customers (name, address, city, country) VALUES($1, $2, $3, $4)",
        [req.body.name, req.body.address, req.body.city, req.body.country]
      );
      const result = await pool.query(
        "SELECT * FROM customers WHERE name = $1",
        [req.body.name]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  newCustomer();
});
//
app.post("/products", (req, res) => {
  const newProduct = async () => {
    try {
      await pool.query("INSERT INTO products (product_name) VALUES($1)", [
        req.body.name,
      ]);
      const result = await pool.query(
        "SELECT * FROM products WHERE product_name = $1",
        [req.body.name]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  newProduct();
});
//
app.post("/availability", (req, res) => {
  const productAvailability = async () => {
    try {
      await pool.query(
        "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES($1, $2, $3)",
        [req.body.prodId, req.body.suppId, req.body.unitPrice]
      );
      const result = await pool.query(
        "SELECT * FROM product_availability WHERE prod_id = $1 AND supp_id = $2",
        [req.body.prodId, req.body.suppId]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  productAvailability();
});

module.exports = app;
