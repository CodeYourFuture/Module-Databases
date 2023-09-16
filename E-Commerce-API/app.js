const express = require("express");
const app = express();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

require("dotenv").config({ path: "./development.env" });
const { Pool } = require("pg");
const bodyParser = require("body-parser");
// const CORS = require("cors");
const port = process.env.PORT || 5000;
// app.use(CORS());

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool();

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
      let unitPrice = await pool.query(
        "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES($1, $2, $3)",
        [
          req.body.prodId,
          req.body.suppId,
          req.body.unitPrice < 0
            ? "Need a positive integer as unit price"
            : req.body.unitPrice,
        ]
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
//
app.post("/customers/:customerId/orders", (req, res) => {
  const newOrder = async () => {
    try {
      const checkCustomerId = await pool.query(
        "SELECT id FROM customers WHERE id = $1",
        [req.params.customerId]
      );
      let customerId =
        checkCustomerId.rows.length !== 0
          ? checkCustomerId.rows[0].id
          : res.json("Customer ID does not exist");
      await pool.query(
        "INSERT INTO orders (order_date, order_reference, customer_id) VALUES($1, $2, $3)",
        [req.body.orderDate, req.body.orderReference, customerId]
      );
      const result = await pool.query(
        "SELECT * FROM orders WHERE order_reference = $1",
        [req.body.orderReference]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  newOrder();
});
//
app.post("/customers/:customerId", (req, res) => {
  const customerUpdate = async () => {
    try {
      const checkCustomerId = await pool.query(
        "SELECT id FROM customers WHERE id = $1",
        [req.params.customerId]
      );
      let customerId =
        checkCustomerId.rows.length !== 0
          ? checkCustomerId.rows[0].id
          : res.json("Customer ID does not exist");
      await pool.query(
        "UPDATE customers SET name = $1, address = $2, city = $3, country = $4 WHERE id = $5",
        [
          req.body.name,
          req.body.address,
          req.body.city,
          req.body.country,
          customerId,
        ]
      );
      const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
        req.params.customerId,
      ]);
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  customerUpdate();
});
//
app.delete("/orders/:orderId", (req, res) => {
  const deleteCustomer = async () => {
    try {
      const checkOrderId = await pool.query(
        "SELECT id FROM orders WHERE id = $1",
        [req.params.orderId]
      );
      let orderId =
        checkOrderId.rows.length !== 0
          ? checkOrderId.rows[0].id
          : res.json("Order ID does not exist");
      const result = await pool.query("DELETE FROM orders WHERE id = $1", [
        orderId,
      ]);

      res.json(result);
    } catch (err) {
      console.log(err);
    }
  };
  deleteCustomer();
});
//
app.delete("/customers/:customerId", (req, res) => {
  const deleteCustomer = async () => {
    try {
      //Checking if a customer exist
      const checkCustomerId = await pool.query(
        "SELECT id FROM customers WHERE id = $1",
        [req.params.customerId]
      );
      let customerId =
        checkCustomerId.rows.length !== 0
          ? checkCustomerId.rows[0].id
          : res.json("Customer ID does not exist");
      //Checking if a customer placed an order
      const checkOrderId = await pool.query(
        "SELECT customer_id FROM orders WHERE customer_id = $1",
        [customerId]
      );
      let orderId =
        checkOrderId.rows.length !== 0 ? res.json("Order exists") : customerId;
      //Delete customer
      const result = await pool.query("DELETE FROM customers WHERE id = $1", [
        orderId,
      ]);

      res.json(result);
    } catch (err) {
      console.log(err);
    }
  };
  deleteCustomer();
});
//
app.get("/customers/:customerId/orders", (req, res) => {
  const newOrder = async () => {
    try {
      //Checking if a customer exist
      const checkCustomerId = await pool.query(
        "SELECT id FROM customers WHERE id = $1",
        [req.params.customerId]
      );
      let customerId =
        checkCustomerId.rows.length !== 0
          ? checkCustomerId.rows[0].id
          : res.json("Customer ID does not exist");
      //Checking if a customer placed an order
      const checkOrderId = await pool.query(
        "SELECT customer_id FROM orders WHERE customer_id = $1",
        [customerId]
      );
      let orderId =
        checkOrderId.rows.length !== 0
          ? customerId
          : res.json("Order does not exist");
      // Load all the orders for one customer
      const result = await pool.query(
        "SELECT c.name, o.order_reference, o.order_date, o.product_name, o.supplier_name, o.unit_price, o.quantity FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM suppliers as s FULL OUTER JOIN product_availability as pa ON s.id = pa.supp_id) as pa FULL OUTER JOIN products as p ON pa.prod_id = p.id) as p FULL OUTER JOIN order_items as i ON p.prod_id = i.product_id) as i FULL OUTER JOIN orders as o ON i.order_id = o.id) as o FULL OUTER JOIN customers as c ON o.customer_id = c.id WHERE c.id = $1;",
        [orderId]
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  newOrder();
});
//
module.exports = app;
