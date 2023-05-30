const { Pool } = require("pg");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//1. all products prices, supplier names
app.get("/products", (req, res) => {
  db.query(
    "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name as supplierName FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)",
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
});
