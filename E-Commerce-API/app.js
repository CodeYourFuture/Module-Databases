const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
// const fs = require("fs");
// const uniqid = require("uniqid");

app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//$ npx nodemon app.js
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

app.get("/products", (req, res) => {
  db.query(
    `select
  p.product_name,
  p_a.unit_price,
  s.supplier_name
from
  products p 
  join product_availability p_a on p.id = p_a.prod_id
  join suppliers s on p.id = s.id`
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App is listening on ${process.env.SERVER_PORT}`);
});
module.exports = app;
