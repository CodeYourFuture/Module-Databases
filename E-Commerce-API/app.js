// const express = require("express");
// const app = express();
// const { Pool } = require("pg");
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj
const express = require("express");

const { Pool } = require("pg");
const app = express();
app.use(express.json());
const port = 3000;
// const db = new Pool({
//   user: process.env.DB_USERNAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USERNAME,
//   //   password: process.env.DB_PASSWORD,
//   password: process.env.DB_PASSWORD,
// });

app.listen(port, () => {
  console.log("Listening on port:", port);
});

const db = new Pool({
  user: "behrouzkarimi",
  host: "localhost",
  password: "behrouz",
  database: "e_commerce",
  port: 5432,
});

//This endpoint returns all the products with name price and suppliername
//If user search for an item using query parameter it return the item if available
app.get("/products", async (req, res) => {
  const queryParam = req.query.search;

  try {
    //If no query parametre defined by the user
    if (queryParam === undefined) {
      const products = await db.query(
        "SELECT pr.product_name AS NAME , pa.unit_price AS price, sp.supplier_name AS supplierName FROM product_availability pa JOIN suppliers sp ON(pa.supp_id=sp.id) JOIN products pr ON (pa.prod_id=pr.id);"
      );
      res.status(200).send(products.rows);
    }
    //If user search for a specific item
    else {
      const queriedSearch = await db.query(
        "SELECT pr.product_name AS NAME , pa.unit_price AS price, sp.supplier_name AS supplierName FROM product_availability pa JOIN suppliers sp ON(pa.supp_id=sp.id) JOIN products pr ON (pa.prod_id=pr.id) WHERE pr.product_name=$1;",
        [queryParam]
      );
      if (queriedSearch.rows.length !== 0) {
        res.status(200).json(queriedSearch.rows);
      } else {
        res
          .status(404)
          .json({ message: "No products found for the searched term." });
      }
    }
  } catch (err) {
    console.error(err, "<----Error happened");
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customers/:customerId", async (req, res) => {
  const idOfCustomer = req.params.customerId;
  console.log(idOfCustomer, "id of customer");
  try {
    const foundCustomer = await db.query(
      "SELECT * FROM customers WHERE id=$1",
      [idOfCustomer]
    );
    if (foundCustomer.rows.length !== 0) {
      res.status(200).json(foundCustomer.rows);
    } else {
      res.status(404).json({ message: "Customer with the id -1 not found!" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

app.post("/customers", (req, res) => {
  const bodyData = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };

  try {
    if (bodyData.name !== "" && bodyData.name !== undefined) {
      const insertCustomer = db.query(
        "INSERT INTO customers(name, address, city, country) VALUES ($1, $2, $3, $4)",
        [bodyData.name, bodyData.address, bodyData.city, bodyData.country]
      );
      res.status(200).json({ message: "Customer created successfully" });
    } else {
      res.status(400).json({ error: "Bad Request! Name cannot be empty" });
    }
  } catch (error) {
    console.error("Error inserting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
