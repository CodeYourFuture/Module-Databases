const express = require("express");
const db = require("../db");
const router = express.Router();

// POST a new product availability with its prod_id, supp_id, and unit_price

router.post("/", async (req, res) => {
  const { prod_id, supp_id, unit_price } = req.body;

  if (prod_id && supp_id && unit_price) {
    if (!Number(unit_price) || unit_price < 0 || unit_price % 1 !== 0) {
      return res.status(400).json({ error: "unit_price has to be a positive integer" });
    }
    if (!Number(prod_id) || prod_id < 0 || prod_id % 1 !== 0) {
      return res.status(400).json({ error: "prod_id has to be a positive integer" });
    }
    if (!Number(supp_id) || supp_id < 0 || supp_id % 1 !== 0) {
      return res.status(400).json({ error: "supp_id has to be a positive integer" });
    }

    try {
      const result = await db.query(
        `
        INSERT INTO product_availability (prod_id, supp_id, unit_price)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [prod_id, supp_id, unit_price]
      )
      const newProductAvailability = result.rows[0];
      res.status(201).json(newProductAvailability);

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
})

module.exports = router;
