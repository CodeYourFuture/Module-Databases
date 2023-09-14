require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//  view a list of all products with their prices and supplier names
app.get("/products", async (req, res) => {
  const products = await db("products")
    .join("suppliers", "products.supplier_id", "=", "suppliers.id")
    .select(
      "products.name",
      "products.price",
      "suppliers.name as supplierName"
    );
  res.json(products);
});

// search for products by name
app.get("/products/:name", async (req, res) => {
  const product = await db("products")
    .where("name", req.params.name)
    .join("suppliers", "products.supplier_id", "=", "suppliers.id")
    .select("products.name", "products.price", "suppliers.name as supplierName")
    .first();
  res.json(product);
});

// view a single customer by their ID
app.get("/customers/:id", async (req, res) => {
  const customer = await db("customers").where("id", req.params.id).first();
  res.json(customer);
});

// create a new customer
app.post("/customers", async (req, res) => {
  const newCustomer = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };
  const [id] = await db("customers").insert(newCustomer);
  newCustomer.id = id;
  res.status(201).json(newCustomer);
});

//  create a new product
app.post("/products", async (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const [id] = await db("products").insert(newProduct);
  newProduct.id = id;
  res.status(201).json(newProduct);
});

// create a new product availability
app.post("/availability", async (req, res) => {
  const newAvailability = {
    price: req.body.price,
    productId: req.body.productId,
    supplierId: req.body.supplierId,
  };
  const [id] = await db("availability").insert(newAvailability);
  newAvailability.id = id;
  res.status(201).json(newAvailability);
});

// create a new order for a customer
app.post("/orders", async (req, res) => {
  const newOrder = {
    customerId: req.body.customerId,
    orderDate: req.body.orderDate,
    reference: req.body.reference,
  };
  const [id] = await db("orders").insert(newOrder);
  newOrder.id = id;
  res.status(201).json(newOrder);
});

// update an existing customer's information
app.put("/customers/:id", async (req, res) => {
  const updatedCustomer = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };
  await db("customers").where("id", req.params.id).update(updatedCustomer);
  res.json(updatedCustomer);
});

// delete an existing order and all associated order items
app.delete("/orders/:id", async (req, res) => {
  await db("order_items").where("order_id", req.params.id).del();
  await db("orders").where("id", req.params.id).del();
  res.status(204).end();
});

// delete an existing customer
app.delete("/customers/:id", async (req, res) => {
  const orders = await db("orders").where("customer_id", req.params.id);
  if (orders.length > 0) {
    res.status(400).json({ error: "Cannot delete customer with orders" });
  } else {
    await db("customers").where("id", req.params.id).del();
    res.status(204).end();
  }
});

// view a list of all products ordered by a particular customer
app.get("/customers/:id/orders", async (req, res) => {
  const orders = await db("orders").where("customer_id", req.params.id);
  for (const order of orders) {
    order.products = await db("order_items")
      .where("order_id", order.id)
      .join("products", "order_items.product_id", "=", "products.id")
      .join("suppliers", "products.supplier_id", "=", "suppliers.id")
      .select(
        "products.name",
        "products.price",
        "suppliers.name as supplier",
        "order_items.quantity"
      );
  }
  res.json(orders);
});

app.listen(process.env.DB_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.DB_PORT}`);
});

module.exports = app;
