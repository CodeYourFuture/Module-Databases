const express = require("express");
const app = express();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const { Pool } = require("pg");
const bodyParser = require("body-parser");
const CORS = require("cors");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: "coder",
  password: "glasgow321!",
  host: "localhost",
  database: "cyf_ecommerce",
  port: 5432,
});

app.get("/products", (req, res) => {
  const allProducts = async () => {
    try {
      const result = await pool.query(
        "SELECT  p.product_name as name, s.unit_price as price, s.supplier_name as supplierName FROM (SELECT * FROM suppliers FULL OUTER JOIN product_availability as pa ON suppliers.id = pa.supp_id ) as s FULL OUTER JOIN products as p ON s.prod_id = p.id"
      );
      res.json(result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  allProducts();
});

module.exports = app;
