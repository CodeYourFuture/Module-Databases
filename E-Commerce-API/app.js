const express = require("express");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();

app.listen(5001, () => {
  console.log("Connected");
});

app.get("/", (request, response) => {
  response.send("HEllo");
});

app.get("/products", (request, res) => {
  const db = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  db.query(
    `SELECT p.product_name,
    pa.unit_price,
      s.supplier_name
     FROM product_availability pa 
      JOIN products p 
      ON pa.prod_id = p.id
      JOIN suppliers s ON pa.supp_id = s.id `
  )
    .then((result) => {
      const newResult = result.rows.map((item) => {
        return {
          name: item.product_name,
          price: item.unit_price,
          supplierName: item.supplier_name,
        };
      });
      res.json(newResult);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/products/name", (res, req)=>{
    let searchedName = req.query.text.toLowerCase();
    
    
  });

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj



module.exports = app;
