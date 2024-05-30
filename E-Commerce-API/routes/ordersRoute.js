const express = require("express");
const db = require("../db");
const router = express.Router();

// POST a new order for a customer with an order date and reference number
router.post("/", async (req, res) => {
  const { order_date, order_reference, customer_id } = req.body;

  if (order_date && order_reference) {
    try {
      const result = await db.query(
        `
        INSERT INTO orders (order_date, order_reference, customer_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [order_date, order_reference, customer_id]
      )
      const order = result.rows[0];
      order.order_date = new Date(order.order_date.getTime() + 3600000).toISOString().split('T')[0];

      res.status(201).json(order)
    } catch (error) {
      res.status(500).json({ error: error.detail })
    }
  } else {
    res.status(400).json({ error: `order_date and order_reference are required` })
  }
})

module.exports = router;
