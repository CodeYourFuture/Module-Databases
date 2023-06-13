const dotenv = require("dotenv");
dotenv.config();

const { response, query } = require("express");
const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3009;

app.use(bodyParser.json());

const productData = require("./dbConfig");

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

// should return a list of all product names with their prices and supplier names and should filter the list of products by name using a query parameter, even if the parameter is not used.
app.get("/products", (req, res) => {
  const searchWord = req.query.word || "";

  let getQuery =
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN suppliers s ON (pa.supp_id = s.id)";

  const searchQuery = " WHERE lower(p.product_name) LIKE '%' || $1 || '%' ";

  productData
    .query(getQuery + " " + searchQuery, [searchWord])
    .then((result) => {
      let product = result.rows.map((item) => {
        return {
          name: item.product_name,
          price: item.unit_price,
          supplierName: item.supplier_name,
        };
      });
      return res.status(200).json(product);
    })
    .catch((error) => {
      console.log(error);
    });
});

// should load a single customer by their ID.
app.get("/customers/:id", (req, res) => {
  const customerID = parseInt(req.params.id);

  const idQuery = "SELECT * FROM customers WHERE id = $1";

  productData
    .query(idQuery, [customerID])
    .then((result) => {
      console.log(result.rows);
      if (result.rows === 0) {
        res.status(404).json({ error: `Customer ${customerID} not found` });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((error) => console.log(error));
});

// should create a new customer with name, address, city, and country.
app.post("/customer", (req, res) => {
  const {
    name: newName,
    address: newAddress,
    city: newCity,
    country: newCountry,
  } = req.body;

  const newQuery =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";

  productData
    .query(newQuery, [newName, newAddress, newCity, newCountry])
    .then(() =>
      res.status(200).json({
        message: "New Customer added",
        customer: {
          name: newName,
          address: newAddress,
          city: newCity,
          country: newCountry,
        },
      })
    )
    .catch((error) => console.log(error));
});

// should create a new product.
app.post("/products", (req, res) => {
  const newProdName = req.body.product_name;

  const prodQuery = "INSERT INTO products (product_name) VALUES ($1)";

  productData
    .query(prodQuery, [newProdName])
    .then(() => {
      res.status(200).json({
        message: "New product added",
        product: {
          product_name: newProdName,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database.
app.post("/availability", (req, res) => {
  const {
    prod_id: newProductID,
    supp_id: newSupplierID,
    unit_price: newPrice,
  } = req.body;

  const productIDQuery = "SELECT 1 FROM products WHERE id=$1";
  const supplierIDQuery = "SELECT 1 FROM suppliers WHERE id=$2";

  if (!parseInt(newPrice) || newPrice <= 0) {
    return res.status(400).json({ error: "Price must be a positive integer" });
  }

  productData
    .query(productIDQuery, [newProductID])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(400).json({ error: "Invalid Product ID" });
      }
    })
    .catch((error) => console.log(error));

  productData
    .query(supplierIDQuery, [newSupplierID])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(400).json({ error: "Invalid Supplier ID" });
      }
    })
    .catch((error) => console.log(error));

  const newQuery =
    "INSERT INTO product_availability ( prod_id, supp_id,unit_price) VALUES ($1, $2, $3)";

  productData
    .query(newQuery, [newProductID, newSupplierID, newPrice])
    .then(() =>
      res.status(200).json({
        message: "New product availability information added",
        productInfo: {
          prod_id: parseInt(newProductID),
          unit_price: parseInt(newPrice),
          supp_id: parseInt(newSupplierID),
        },
      })
    )
    .catch((error) => console.log(error));
});

// should create a new order for a customer, including an order date and order reference. An error should be returned if the customer ID doesn't correspond to an existing customer.
app.post("/customers/:id/orders", (req, res) => {
  const {
    order_date: newDate,
    order_reference: newRef,
    customer_id: newCustID,
  } = req.body;

  const customerIDQuery = "SELECT 1 FROM customers WHERE id=$1";

  productData
    .query(customerIDQuery, [newCustID])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(400).json({ error: "Invalid Customer ID" });
      }
    })
    .catch((error) => console.log(error));

  const orderPrefix = "ORD";

  const refQuery = "SELECT 1 FROM orders WHERE order_reference=$2";

  productData
    .query(refQuery, [newRef])
    .then((result) => {
      if (result.rowCount > 0) {
        if (!newRef.includes(orderPrefix)) {
          throw { error: "Order reference had to include 'ORD'" };
        }
      }
    })
    .catch((error) => console.log(error));

  const newQuery =
    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";

  productData
    .query(newQuery, [newDate, newRef, newCustID])
    .then(() => {
      res.status(200).json({
        message: "New order added",
        orderInfo: {
          order_date: newDate,
          order_reference: parseInt(newRef),
          customer_id: parseInt(newCustID),
        },
      });
    })
    .catch((error) => console.log(error));
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});

module.exports = app;
