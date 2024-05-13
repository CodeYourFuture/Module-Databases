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

app.get("/products", async (req, res) => {
  const customers = await db.query("SELECT * FROM products");
  res.status(200).send(customers.rows);
});

app.get("/search/:search", async (req, res) => {
  const searchItem = req.params.search;
  try {
    const resultInDB = await db.query(
      "SELECT * FROM products WHERE product_name=$1",
      [searchItem]
    );
    if (resultInDB.rows.length !== 0) {
      res.status(200).json(resultInDB.rows);
    } else {
      res
        .status(404)
        .json({ message: "No products found for the search term." });
    }
  } catch (error) {
    res.status(404).json({ success: flase });
    console.error(error);
  }
});

module.exports = app;
