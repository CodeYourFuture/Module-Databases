const { Pool } = require("pg");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const e = require("express");

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
// app.get("/products", (req, res) => {
//   db.query(
//     "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name  FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)",
//     (error, result) => {
//       if (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         res.status(200).json(result.rows);
//       }
//     }
//   );
// });

//1. all products prices, supplier names
//2.search for products by name
app.get("/products", (req, res) => {
  if (req.query.name && req.query.name.length > 0) {
    db.query(
      `SELECT p.product_name as name, pa.unit_price as price, s.supplier_name  FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id) where p.product_name ilike $1`,
      [`%${req.query.name}%`],
      (error, result) => {
        if (error) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  } else {
    db.query(
      "SELECT p.product_name as name, pa.unit_price as price, s.supplier_name  FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)",
      (error, result) => {
        if (error) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  }
});

app.get("/customers/:id", (req, res) => {
  db.query(
    "SELECT * from customers where id=$1",
    [`${req.params.id}`],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
});

app.post("/customers", (req, res) => {
  db.query(
    "INSERT into customers (name, address, city, country) values ($1, $2, $3, $4) returning *",
    [req.body.name, req.body.address, req.body.city, req.body.country],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
});

app.post("/products", (req, res) => {
  db.query(
    "INSERT into products (product_name) values ($1) returning *",
    [req.body.product_name],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json(result.rows);
      }
    }
  );
});

app.post("/availability", (req, res) => {
  db.query(
    "insert into product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
    [req.body.prod_id, req.body.supp_id, req.body.unit_price],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json(result.rows);
      }
    }
  );
});

module.exports = app;
