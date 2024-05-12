const express = require("express");
const app = express();
//require("dotenv").config();
const port = 3307;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const pg = require("pg");
module.exports = app;

const { Pool } = pg;
const db = new Pool({
  user: "Damoon",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/products", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT pro.product_name, sup.supplier_name, pa.unit_price
        FROM products pro JOIN suppliers sup ON pro.id = sup.id
        JOIN product_availability pa ON pa.supp_id = sup.id `
    );

    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get by name
app.get("/products/:name", (req, res) => {
  let productName = req.params.name;
  productName = productName.replace(/-/g, " ");
  db.query("SELECT * FROM products WHERE lower(product_name) LIKE $1 || '%'", [
    productName.toLowerCase(),
  ]).then((result) => res.json(result.rows));
});

//get by id
app.get("/customers/:id", function (req, res) {
  const custId = parseInt(req.params.id);
  db.query("SELECT * FROM customers WHERE id = $1", [custId])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

//post customers
app.post("/customers", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const query = `INSERT INTO customers(name, address, city, country)VALUES($1,$2,$3,$4)`;
  db.query(query, [name, address, city, country])
    .then(() => {
      res.status(200).send("created a new customer was successfully !");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

//post product
app.post("/products", (req, res) => {
  const productName = req.body.product_name;
  const query = `INSERT INTO products(product_name)VALUES($1)`;
  db.query(query, [productName])
    .then(() => {
      res.status(200).send("created a new product was successfully !");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

app.listen(port, () => {
  console.log(`server listening on port ${port} !`);
});
