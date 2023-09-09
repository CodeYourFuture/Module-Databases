const express = require("express");
const app = express();
const { Pool } = require("pg");

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const db = new Pool({
  host: "localhost",
  port: 5432,
  database: "cyf_ecommerce",
  user: "bekomeigag",
  password: "Cyf@3377441",
});

app.get("/", (req, res) => {
  res.send("this server is working on port 3099....");
});

app.get("/products", (req, res) => {
  db.query(
    ` select p.product_name AS name, pa.unit_price AS price, s.supplier_name As "supplierName"
        from products p
        join product_availability pa
        on p.id = pa.prod_id
        join suppliers s
        on pa.supp_id = s.id
      `
  )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

const port = process.env.PORT || 3306;
app.listen(port, () => console.log(`listen on port ${port} .....!!`));
module.exports = app;
