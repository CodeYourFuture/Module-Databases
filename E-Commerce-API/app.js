const express = require("express");
const app = express();
var bodyParser = require("body-parser");
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj
require("dotenv").config();
const { Pool } = require("pg");

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=cyf_ecommerce
DB_USERNAME=postgres
DB_PASSWORD=""
const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.use(express.json());
app.get("/products", (req, res) => {
  db.query(
    "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name as supplierName FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)",
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // res.json(result.rows);
        // const products = result.rows.map(({ name, price, suppliername }) => ({
        //   name,
        //   price,
        //   supplierName: suppliername,
        // }));
        res.status(200).json(result.rows);
      }
    }
  );
});

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

app.get("/customers/:id", (req, res) => {
  const custId = parseInt(req.params.id);
  db.query(
    "SELECT * FROM customers WHERE id = $1",
    [custId],
    (error, result) => {
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
    }
  );
});
app.post("/customers", (req, res) => {
    const newName = req.body.name;
    const newAdress = req.body.adress;
    const newCity= req.body.city;
    const newCountry = req.body.country;

  
  db.query(
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) RETURNING *",
    [newName, newAdress, newCity,  newCountry],
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
app.post("/products", (req, res) => {
  const productName = req.body;
  db.query(
    "INSERT INTO products (product_name) VALUES ($1) RETURNING *",
    [productName],
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

app.post("/availability", (req, res) => {

    newPrice = req.body.price;
    newProductid = req.body.productId;
    newSupplierid = req.body.supplierId;
//   const { price, productId, supplierId } = req.body;

  // Check if the price is a positive integer
  if (!Number.isInteger(newPrice) || newPrice <= 0) {
    res.status(400).json({ error: "Price must be a positive integer" });
    return;
  }

  db.query(
    "SELECT * FROM products WHERE id = $1",
    [newProductid],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        // Check if the supplier exists
        db.query(
          "SELECT * FROM suppliers WHERE id = $1",
          [newSupplierid],
          (error, result) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: "Internal Server Error" });
            } else if (result.rows.length === 0) {
              res.status(404).json({ error: "Supplier not found" });
            } else {
              // Insert the new availability
              db.query(
                "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
                [newProductid, newSupplierid, newPrice],
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
            }
          }
        );
      }
    }
  );
});
app.post("/orders", (req, res) => {
  const { orderDate, referenceNumber, customerId } = req.body;

  // Check if the customer ID is valid
  db.query(
    "SELECT * FROM customers WHERE id = $1",
    [customerId],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const customer = result.rows[0];
        if (customer) {
          db.query(
            "INSERT INTO orders (customer_id, order_date, reference_number) VALUES ($1, $2, $3) RETURNING *",
            [customerId, orderDate, referenceNumber],
            (error, result) => {
              if (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                const order = result.rows[0];
                res.status(201).json(order);
              }
            }
          );
        } else {
          res.status(404).json({ error: "Invalid customer ID" });
        }
      }
    }
  );
});
app.listener = app.listen(3000, function () {
  console.log(`Server is listening on port ${3000}`);
});
module.exports = app;
