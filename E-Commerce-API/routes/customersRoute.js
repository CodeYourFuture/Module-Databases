const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT *
      from customers
      where id = $1
      `, [id]
    );

    const customer = result.rows[0];

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
