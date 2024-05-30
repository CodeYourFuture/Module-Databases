const express = require("express");
const db = require("../db");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT p.product_name, pa.unit_price, s.supplier_name
      from products p
      join product_availability pa on p.id = pa.prod_id
      join suppliers s on pa.supp_id = s.id
      order by p.product_name
      `
    );

    const productsList = result.rows.map(row => ({
      name: row.product_name,
      price: row.unit_price,
      supplierName: row.supplier_name
    }));

    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET product by name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const result = await db.query(
      `
      SELECT p.product_name, pa.unit_price, s.supplier_name
      from products p
      join product_availability pa on p.id = pa.prod_id
      join suppliers s on pa.supp_id = s.id
      where lower(p.product_name) like lower($1)
      order by pa.unit_price;
      `, [`%${name}%`]
    );

    const productsList = result.rows.map(row => ({
      name: row.product_name,
      price: row.unit_price,
      supplierName: row.supplier_name
    }));

    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new product with its name
router.post("/", async (req, res) => {
  const { product_name } = req.body;

  if (product_name) {
    try {
      const result = await db.query(
        `
        INSERT INTO products (product_name)
        VALUES ($1)
        RETURNING *;
        `, [product_name]
      )

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "name is required" });
  }
})

module.exports = router;
