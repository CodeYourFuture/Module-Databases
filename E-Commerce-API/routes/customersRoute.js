const express = require("express");
const db = require("../db");
const router = express.Router();

// GET customer by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!isNaN(id)) {
      const result = await db.query(
        `
      SELECT *
      from customers
      where id = $1
      `, [id]
      );

      const customer = result.rows[0];

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found." });
      }
    } else {
      res.status(400).json({ error: "Customer ID should be a valid number." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new customer with their name, address, city, and country
router.post("/", async (req, res) => {
  const { name, address, city, country } = req.body;

  if (name) {
    try {
      const result = await db.query(
        `
        INSERT INTO customers (name, address, city, country)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [name, address, city, country])

      const addedCustomer = result.rows[0];

      res.status(201).json(addedCustomer);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Name is required." });
  }
})

// PUT an existing customer by id with their name, address, city, and country
router.put("/", async (req, res) => {
  const { id, name, address, city, country } = req.body;
  if (id) {

    try {
      const result = await db.query(
        `
        UPDATE customers
        SET name = $1, address = $2, city = $3, country = $4
        WHERE id = $5
        RETURNING *
        `, [name, address, city, country, id]
      );

      const updatedCustomer = result.rows[0];

      res.status(200).json(updatedCustomer);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "ID is required." });
  }
})

//DELETE an existing customer by id only if they have no orders
router.delete("/", async (req, res) => {
  const { id } = req.body;

  if (id) {
    try {
      const result = await db.query(
        `
        DELETE FROM customers
          WHERE id = $1
        RETURNING *;
        `, [id]
      );

      const deletedCustomer = result.rows[0];

      if (deletedCustomer) {
        res.status(200).json({ ...deletedCustomer, message: 'customer deleted' })

      } else {
        res.status(404).json({ error: "Customer not found." });
      }


    } catch (error) {
      if (error.message.includes(`update or delete on table "customers" violates foreign key constraint "orders_customer_id_fkey" on table "orders"`))
      res.status(500).json({ error: "Cannot delete customer with existing orders." });
    }
  }
})

module.exports = router;
