const express = require("express");
const app = express();
const PORT = 5006;
const { Pool } = require("pg");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const myDataBase = new Pool({
  user: "gaylengozi",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

app.get("/products", (request, response) => {
  console.log(request.query.name);
  let query =
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN suppliers s ON (s.id = pa.supp_id)";

  if (request.query.name) {
    query += ` WHERE LOWER(product_name) LIKE '%${request.query.name.toLowerCase()}%'`;
    console.log(query);
  }
  myDataBase
    .query(query)
    .then((result) => {
      const arrayData = result.rows.map((row) => ({
        name: row.product_name,
        price: row.unit_price,
        supplierName: row.supplier_name,
      }));
      console.log(arrayData);

      return response.status(200).json(arrayData);
    })
    .catch((error) => {
      console.log(error);
    });
});


app.get("/customers", (request, response) => {
  console.log(request.query);
  let query =
    "SELECT * FROM customers";

    if (request.query.name) {
      query += ` WHERE LOWER(customers.name) LIKE '%${request.query.name.toLowerCase()}%'`;
      console.log(query);
    }

     myDataBase
    .query(query)
    .then((result) => {
      const arrayData = result.rows.map((row) => ({
        name: row.name,
        address: row.address,
        city: row.city,
        country: row.country
      }));
  
      return response.status(200).json(arrayData);
  })
  .catch((error) => {
      console.log(error);
    });
});



app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});

module.exports = app;
