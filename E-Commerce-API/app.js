// I did not write over any query questions and have code here to answer each question. If you run queries you need to remember to mask/hide/unmark those queries you dont use.

const { Pool } = require("pg");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection pool setup
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// As a user, I want to view a list of all products with their prices and supplier names.
// In a real application, I fetch products database.
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// As a user, I want to search for products by name.
app.get("/products", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT
        p.product_name as name,
        pa.unit_price as price,
        s.supplier_name as supplierName
      FROM
        products p
      INNER JOIN
        product_availability pa ON p.id = pa.prod_id
      INNER JOIN
        suppliers s ON pa.supp_id = s.id
    `);

    // Release the database client connection
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// In the question it says search but I wonder if they meant find so here is that solution and just below is for search. As a user, I want to view a list of all product names.
app.get("/product-names", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT
        product_name
      FROM
        products
    `);

    // Release the database client connection
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to search for products by name.
// Add this code to your App.js

// As a user, I want to search for products by name.
app.get("/products/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid search query, please provide a product name" });
    }

    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT
        p.product_name as name,
        pa.unit_price as price,
        s.supplier_name as supplierName
      FROM
        products p
      INNER JOIN
        product_availability pa ON p.id = pa.prod_id
      INNER JOIN
        suppliers s ON pa.supp_id = s.id
      WHERE
        p.product_name ILIKE $1
    `,
      [`%${name}%`]
    );

    // Release the database client connection
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to view a single customer by their ID.
app.get("/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;

    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT
        id,
        name,
        address,
        city,
        country
      FROM
        customers
      WHERE
        id = $1
    `,
      [customerId]
    );

    // Release the database client connection
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);

  if (isNaN(customerId) || customerId < 1) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(200).json(customer);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Create a new customer with their name, address, city, and country
app.post("/customers", async (req, res) => {
  try {
    const { name, address, city, country } = req.body;

    if (!name || !address || !city || !country) {
      return res
        .status(400)
        .json({ error: "Please provide name, address, city, and country" });
    }

    const query = {
      text: "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [name, address, city, country],
    };

    const client = await db.connect();
    const result = await client.query(query);

    // Release the database client connection
    client.release();

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting customer into the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to create a new product.
// Create a new product
app.post("/products", async (req, res) => {
  try {
    const { product_name } = req.body;

    if (!product_name || product_name.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input. Please provide a product_name." });
    }

    const client = await db.connect();
    const result = await client.query(
      `
      INSERT INTO products (product_name)
      VALUES ($1)
      RETURNING *
    `,
      [product_name]
    );

    // Release the database client connection
    client.release();

    res.status(201).json({
      message: "Product created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating the product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
app.post("/product-availability", async (req, res) => {
  try {
    const { prod_id, supp_id, unit_price } = req.body;

    // Ensure prod_id and supp_id exist in their respective tables
    const productExists = await pool.query(
      "SELECT id FROM products WHERE id = $1",
      [prod_id]
    );
    const supplierExists = await pool.query(
      "SELECT id FROM suppliers WHERE id = $1",
      [supp_id]
    );

    if (productExists.rows.length === 0) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (supplierExists.rows.length === 0) {
      return res.status(400).json({ error: "Supplier not found" });
    }

    // Ensure unit_price is a positive integer
    const parsedUnitPrice = parseInt(unit_price);

    if (isNaN(parsedUnitPrice) || parsedUnitPrice <= 0) {
      return res.status(400).json({ error: "Invalid unit price" });
    }

    // Insert the new product availability into the database
    const result = await pool.query(
      `
      INSERT INTO product_availability (prod_id, supp_id, unit_price)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [prod_id, supp_id, parsedUnitPrice]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid.
app.post("/orders", async (req, res) => {
  try {
    const { order_date, order_reference, customer_id } = req.body;

    // Check if the customer with the provided ID exists
    const customerExists = await pool.query(
      "SELECT 1 FROM customers WHERE id = $1",
      [customer_id]
    );

    if (customerExists.rows.length === 0) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    // Insert the new order if the customer exists
    const result = await pool.query(
      "INSERT INTO orders (order_date, order_reference, customer_id) SELECT $1, $2, $3 RETURNING *",
      [order_date, order_reference, customer_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating the order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to update an existing customer's information with their name, address, city, and country.
app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, country } = req.body;

    const client = await pool.connect();
    const result = await client.query(
      `
      UPDATE customers
      SET
          name = $1,
          address = $2,
          city = $3,
          country = $4
      WHERE
          id = $5
      RETURNING *
      `,
      [name, address, city, country, id]
    );

    // Release the database client connection
    client.release();

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json({ message: "Customer updated successfully" });
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to delete an existing order and all associated order items.
app.delete("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const client = await pool.connect();

    // Check if the order exists
    const orderExistsQuery = "SELECT id FROM orders WHERE id = $1";
    const orderExistsResult = await client.query(orderExistsQuery, [orderId]);

    // Check if the order with the provided ID exists in the database
    const orderExists = await db.query("SELECT 1 FROM orders WHERE id = $1", [
      orderId,
    ]);

    if (!orderExists.rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete order items associated with the order
    const deleteOrderItemsQuery = "DELETE FROM order_items WHERE order_id = $1";
    await client.query(deleteOrderItemsQuery, [orderId]);

    // Delete the order itself
    const deleteOrderQuery = "DELETE FROM orders WHERE id = $1";
    await client.query(deleteOrderQuery, [orderId]);

    client.release();

    // Respond with a success message
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to delete an existing customer only if they do not have any orders.
// DELETE an existing customer only if they have no orders
app.delete("/customers/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    // Check if the customer has any associated orders
    const checkOrdersQuery = {
      text: "SELECT DISTINCT customer_id FROM orders WHERE customer_id = $1",
      values: [customerId],
    };

    // Check if the customer with the provided ID exists in the database
    const customerExists = await db.query(
      "SELECT 1 FROM customers WHERE id = $1",
      [customerId]
    );

    if (ordersResult.rows.length > 0) {
      return res.status(400).json({
        error: "Customer has associated orders and cannot be deleted.",
      });
    }

    // Check if the customer has any orders
    const customerHasOrders = await db.query(
      "SELECT 1 FROM orders WHERE customer_id = $1",
      [customerId]
    );

    if (customerHasOrders.rows.length) {
      return res
        .status(400)
        .json({ error: "Customer has existing orders and cannot be deleted" });
    }

    res.status(204).send(); // No content, indicating successful deletion
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.

app.get("/customers/:customerId/orders", async (req, res) => {
  try {
    const { customerId } = req.params;

    // Ensure customerId is a valid integer
    if (!Number.isInteger(Number(customerId))) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT
          o.order_reference,
          o.order_date,
          p.product_name,
          pa.unit_price,
          s.supplier_name,
          oi.quantity
      FROM
          orders o
      INNER JOIN
          order_items oi ON o.id = oi.order_id
      INNER JOIN
          products p ON oi.product_id = p.id
      INNER JOIN
          product_availability pa ON p.id = pa.prod_id
      INNER JOIN
          suppliers s ON pa.supp_id = s.id
      WHERE
          o.customer_id = $1
      `,
      [customerId]
    );

    // Release the database client connection
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;

// original;
// const express = require("express");
// const app = express();
// // Your code to run the server should go here
// // Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// // Use environment variables instead:
// // https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

// module.exports = app;
