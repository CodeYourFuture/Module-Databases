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

router.delete("/", async (req, res) => {
  const { order_id } = req.body;

  if (order_id) {
    try {
      const orderItemsDeleted = (await db.query("DELETE FROM order_items WHERE order_id = $1 RETURNING *;", [order_id])).rows;
      const orderDeleted = (await db.query("DELETE FROM orders WHERE id = $1 RETURNING *;", [order_id])).rows[0];

      if (orderItemsDeleted.length === 0) {
        res.status(404).json({ error: `Order not found` })
      } else {
        res.status(200).json({ ...orderItemsDeleted, ...orderDeleted, message: `Order deleted successfully` })
      }
    }
    catch (error) {
      res.status(500).json({ error: error.detail })
    }
  } else {
    res.status(400).json({ error: `order_id is required` })
  }

})

router.get("/", async (req, res) => {
  const { customer_id } = req.body;

  if (customer_id) {
    try {
      const result = await db.query(`
      SELECT
        o.order_reference,
        o.order_date,
        p.product_name,
        pa.unit_price,
        s.supplier_name,
        oi.quantity
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN product_availability pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id
      JOIN products p ON oi.product_id = p.id
      JOIN suppliers s ON oi.supplier_id = s.id
      WHERE o.customer_id = $1
      ORDER BY o.order_reference;
      `, [customer_id]);
      const detailedOrders = result.rows;

      if (detailedOrders.length === 0) {
        res.status(404).json({ error: `Customer not found` })
      } else {
        res.status(200).json(detailedOrders)
      }

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(400).json({ error: `customer_id is required` })
  }
})

module.exports = router;
