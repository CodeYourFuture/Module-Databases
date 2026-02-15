// Here are generic solutions for not a particular type of database.

// const { Pool } = require("pg");

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const port = process.env.PORT || 5000;
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// dotenv.config();
// app.listen(port, () => console.log(`Listening on port ${port}`));
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// const db = new Pool({
//   user: process.env.DB_USERNAME,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
// const products = [{}];

// // As a user, I want to view a list of all products with their prices and supplier names.
// // In a real application, I fetch products database.
// app.get("/products", (req, res) => {
//   res.status(200).json(products);
// // });

// // As a user, I want to search for products by name.
// app.get("/products", async (req, res) => {
//   try {
//     // Extract and default the 'name' query parameter
//     const nameFilter = req.query.name || "";

//     // Fetch and send the filtered list of products as JSON response
//     res.status(200).json(await fetchProductsByName(nameFilter));
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // As a user, I want to view a single customer by their ID.

// app.get("/customers/:id", (req, res) => {
//   const customerId = parseInt(req.params.id);

//   if (isNaN(customerId) || customerId < 1) {
//     return res.status(400).json({ error: "Invalid customer ID" });
//   }

//   const customer = customers.find((c) => c.id === customerId);

//   if (!customer) {
//     return res.status(404).json({ error: "Customer not found" });
//   }

//   res.status(200).json(customer);
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // Create a new customer with their name, address, city, and country
// app.post("/customers", async (req, res) => {
//   try {
//     const { name, address, city, country } = req.body;

//     // Validate input data (ensure all required fields are provided)
//     if (!name || !address || !city || !country) {
//       return res.status(400).json({ error: "Incomplete customer data" });
//     }

//     // Insert the new customer into the database and return the newly created customer
//     const result = await db.query(
//       "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) RETURNING *",
//       [name, address, city, country]
//     );

//     // Send the newly created customer as a JSON response
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // As a user, I want to create a new product.
// // Create a new product
// app.post("/products", async (req, res) => {
//   try {
//     const { name, price, supplierName } = req.body;

//     // Validate input data (ensure all required fields are provided)
//     if (!name || !price || !supplierName) {
//       return res.status(400).json({ error: "Incomplete product data" });
//     }

//     // Insert the new product into the database and return the newly created product
//     const result = await db.query(
//       "INSERT INTO products (product_name) VALUES ($1) RETURNING *",
//       [name]
//     );

//     const productId = result.rows[0].id;

//     // Insert product availability data
//     await db.query(
//       "INSERT INTO product_availability (prod_id, unit_price, supp_id) VALUES ($1, $2, $3)",
//       [productId, price, supplierName]
//     );

//     // Send the newly created product as a JSON response
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ... (error handling middleware and other routes)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // Endpoint `/availability` should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database.
// app.post("/availability", async (req, res) => {
//   try {
//     const { productId, supplierId, price } = req.body;

//     // Validate input data
//     if (!productId || !supplierId || !price) {
//       return res.status(400).json({ error: "Incomplete availability data" });
//     }

//     // Ensure product and supplier IDs exist in the database
//     const productExists = await db.query(
//       "SELECT 1 FROM products WHERE id = $1",
//       [productId]
//     );
//     const supplierExists = await db.query(
//       "SELECT 1 FROM suppliers WHERE id = $1",
//       [supplierId]
//     );

//     if (!productExists.rows.length || !supplierExists.rows.length) {
//       return res.status(400).json({ error: "Invalid product or supplier ID" });
//     }

//     // Validate price as a positive number
//     if (typeof price !== "number" || price <= 0) {
//       return res.status(400).json({ error: "Price must be a positive number" });
//     }

//     // Insert the new availability into the database and return the newly created availability
//     const result = await db.query(
//       "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
//       [productId, supplierId, price]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ... (error handling middleware and other routes
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid.

// // As a user, I want to create a new order for a customer.
// app.post("/customers/:customerId/orders", async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);

//     // Validate customer ID
//     if (isNaN(customerId) || customerId < 1) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     // Ensure the customer with the provided ID exists in the database
//     const customerExists = await db.query(
//       "SELECT 1 FROM customers WHERE id = $1",
//       [customerId]
//     );

//     if (!customerExists.rows.length) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     const { orderDate, referenceNumber } = req.body;

//     // Validate input data
//     if (!orderDate || !referenceNumber) {
//       return res.status(400).json({ error: "Incomplete order data" });
//     }

//     // Insert the new order into the database and return the newly created order
//     const result = await db.query(
//       "INSERT INTO orders (customer_id, order_date, reference_number) VALUES ($1, $2, $3) RETURNING *",
//       [customerId, orderDate, referenceNumber]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ... (error handling middleware and other routes
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // As a user, I want to update an existing customer's information with their name, address, city, and country.
// // Update an existing customer's information
// app.put("/customers/:customerId", async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);

//     // Validate customer ID
//     if (isNaN(customerId) || customerId < 1) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     // Ensure the customer with the provided ID exists in the database
//     const customerExists = await db.query(
//       "SELECT 1 FROM customers WHERE id = $1",
//       [customerId]
//     );

//     if (!customerExists.rows.length) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     const { name, address, city, country } = req.body;

//     // Validate input data (ensure all required fields are provided)
//     if (!name || !address || !city || !country) {
//       return res.status(400).json({ error: "Incomplete customer data" });
//     }

//     // Update the customer's information in the database
//     const result = await db.query(
//       "UPDATE customers SET name = $1, address = $2, city = $3, country = $4 WHERE id = $5 RETURNING *",
//       [name, address, city, country, customerId]
//     );

//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // As a user, I want to delete an existing order and all associated order items.
// app.delete("/orders/:orderId", async (req, res) => {
//   try {
//     const orderId = parseInt(req.params.orderId);

//     // Validate order ID
//     if (isNaN(orderId) || orderId < 1) {
//       return res.status(400).json({ error: "Invalid order ID" });
//     }

//     // Check if the order with the provided ID exists in the database
//     const orderExists = await db.query("SELECT 1 FROM orders WHERE id = $1", [orderId]);

//     if (!orderExists.rows.length) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     // Delete the order and associated order items from the database
//     await db.query("DELETE FROM order_items WHERE order_id = $1", [orderId]);
//     await db.query("DELETE FROM orders WHERE id = $1", [orderId]);

//     res.status(204).send(); // No content response for successful deletion
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ... (error handling middleware and other routes
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // As a user, I want to delete an existing customer only if they do not have any orders.
// app.delete("/customers/:customerId", async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);

//     // Validate customer ID
//     if (isNaN(customerId) || customerId < 1) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     // Check if the customer with the provided ID exists in the database
//     const customerExists = await db.query("SELECT 1 FROM customers WHERE id = $1", [customerId]);

//     if (!customerExists.rows.length) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     // Check if the customer has any orders
//     const customerHasOrders = await db.query("SELECT 1 FROM orders WHERE customer_id = $1", [customerId]);

//     if (customerHasOrders.rows.length) {
//       return res.status(400).json({ error: "Customer has existing orders and cannot be deleted" });
//     }

//     // Delete the customer from the database
//     await db.query("DELETE FROM customers WHERE id = $1", [customerId]);

//     res.status(204).send(); // No content response for successful deletion
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ... (error handling middleware and other routes
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ error: "Internal Server Error" });
// // });

// // As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.
// // ...

// // Load all orders with their items for a specific customer
// app.get("/customers/:customerId/orders", async (req, res) => {
//   try {
//     const customerId = parseInt(req.params.customerId);

//     // Validate customer ID
//     if (isNaN(customerId) || customerId < 1) {
//       return res.status(400).json({ error: "Invalid customer ID" });
//     }

//     // Check if the customer with the provided ID exists in the database
//     const customerExists = await db.query(
//       "SELECT 1 FROM customers WHERE id = $1",
//       [customerId]
//     );

//     if (!customerExists.rows.length) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     // Fetch all orders with their items for the specific customer
//     const ordersWithItems = await db.query(
//       `
//       SELECT
//         o.id AS order_id,
//         o.order_date,
//         o.reference_number,
//         p.product_name,
//         pa.unit_price,
//         s.supplier_name,
//         oi.quantity
//       FROM orders o
//       INNER JOIN order_items oi ON o.id = oi.order_id
//       INNER JOIN products p ON oi.product_id = p.id
//       INNER JOIN product_availability pa ON p.id = pa.prod_id
//       INNER JOIN suppliers s ON pa.supp_id = s.id
//       WHERE o.customer_id = $1
//       `,
//       [customerId]
//     );

//     res.status(200).json(ordersWithItems.rows);
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = app;

// // original;
// // const express = require("express");
// // const app = express();
// // // Your code to run the server should go here
// // // Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// // // Use environment variables instead:
// // // https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

// // module.exports = app;
