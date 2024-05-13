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

app.get("/customers", async (req, res) => {
  const customers = await db.query("SELECT * FROM orders");
  res.status(200).send(customers.rows);
});

module.exports = app;
