const express = require("express");
const db = require("../db");
const router = express.Router();

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

module.exports = router;
