const { Router } = require("express");
const db = require("./db.js");

const router = Router();

router.get("/products", async (req, res) => {
  const response = await db.query(
    'SELECT p.product_name AS name, pa.unit_price AS price, s.supplier_name AS "supplierName" FROM products AS p JOIN product_availability as pa ON pa.prod_id = p.id JOIN suppliers AS s ON s.id = pa.supp_id'
  );
  res.json(response.rows);
});

module.exports = router;
