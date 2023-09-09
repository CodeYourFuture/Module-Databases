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

const dummyProducts = [
  {
    name: "table",
    price: 9999,
    supplierName: "CO.Post",
  },
];
app.get("/products", (req, res) => {
  res.send(dummyProducts);
});

app.listen(process.env.DB_PORT, () => {
  console.log(`App is listening on ${process.env.DB_PORT}`);
});
module.exports = app;
