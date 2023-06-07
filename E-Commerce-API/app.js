require('dotenv').config();
const express = require("express");
const app = express();

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/products", async (request, response) => {
  try {
    let productQuery = "SELECT p.product_name , pa.unit_price , s.supplier_name  FROM products p INNER JOIN product_availability pa on (p.id = pa.prod_id) INNER JOIN suppliers s on (pa.supp_id = s.id)"

    if (request.query.name) {
      productQuery += ` WHERE LOWER(product_name) LIKE '%${request.query.name.toLowerCase()}%'`;
    }

    const result = await db.query(
      productQuery
    );

    const testequest = result.rows.map((row) => ({
      name: row.product_name,
      price: row.unit_price,
      supplierName: row.supplier_name,
    }))

    return response.status(200).json(testequest);
  }
  catch (error) {
    response.status(400).json({
      "result": false,
    })
  };
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;