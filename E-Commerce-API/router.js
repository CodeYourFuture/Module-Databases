const { Router } = require("express");
const db = require("./db.js");

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { name } = req.query;

    let query = `
        SELECT p.product_name AS name, pa.unit_price AS price, s.supplier_name AS "supplierName"
        FROM products AS p
        JOIN product_availability AS pa ON pa.prod_id = p.id
        JOIN suppliers AS s ON s.id = pa.supp_id
      `;

    if (name) {
      query += ` WHERE p.product_name = $1`;
    }

    const response = name ? await db.query(query, [name]) : await db.query(query);

    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/customers/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;

  const response = await db.query(`SELECT * FROM customers WHERE id = ${customer_id}`);

  res.json(response.rows[0]);
});

router.post("/customers", async (req, res) => {
  const new_customer = req.body;

  try {
    const response = await db.query(
      `INSERT INTO customers (name, address, city, country)
        VALUES ($1, $2, $3, $4)`,
      [new_customer.name, new_customer.address, new_customer.city, new_customer.country]
    );
    res.status(201).send("new customer added");
  } catch (err) {
    console.log(err);
  }
});

router.post("/products", async (req, res) => {
  const new_product = req.body;

  try {
    const response = await db.query(
      `INSERT INTO products (product_name)
          VALUES ($1)`,
      [new_product.product_name]
    );
    res.status(201).send("new product added");
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
});

router.post("/availability", async (req, res) => {
  const { prod_id, supp_id, unit_price } = req.body;

  if (!prod_id || !supp_id || unit_price === undefined || unit_price <= 0) {
    return res.status(400).send("Invalid input data");
  }

  try {
    await db.query(
      `INSERT INTO product_availability (prod_id, supp_id, unit_price)
         VALUES ($1, $2, $3)`,
      [prod_id, supp_id, unit_price]
    );
    res.status(201).send("New product availability added");
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while adding product availability");
  }
});

router.post("/customers/:customerId/orders", async (req, res) => {
  const { customerId } = req.params;
  const { order_date, order_reference, product_id, supplier_id, quantity } = req.body;

  if (!order_date || !order_reference || !product_id || !supplier_id || quantity <= 0) {
    return res.status(400).send("Invalid input data");
  }

  try {
    const result = await db.query(
      `INSERT INTO orders (customer_id, order_date, order_reference)
         VALUES ($1, $2, $3) RETURNING id`,
      [customerId, order_date, order_reference]
    );
    const orderId = result.rows[0].id;

    await db.query(
      `INSERT INTO order_items (order_id, product_id, supplier_id, quantity)
         VALUES ($1, $2, $3, $4)`,
      [orderId, product_id, supplier_id, quantity]
    );

    res.status(201).send("New order created");
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while creating the order");
  }
});

router.patch("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { name, address } = req.body;

  try {
    await db.query(`UPDATE customers SET name = $1, address = $2 WHERE id = $3`, [
      name,
      address,
      customerId,
    ]);
    res.status(200).send("Customer updated");
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while updating the customer");
  }
});

router.delete("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    await db.query(`DELETE FROM order_items WHERE order_id = $1`, [orderId]);
    await db.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while deleting the order");
  }
});

router.delete("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await db.query(`SELECT * FROM orders WHERE customer_id = $1`, [customerId]);

    if (result.rows.length > 0) {
      return res.status(400).send("Cannot delete customer with existing orders");
    }

    await db.query(`DELETE FROM customers WHERE id = $1`, [customerId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while deleting the customer");
  }
});

router.get("/customers/:customerId/orders", async (req, res) => {
  const { customerId } = req.params;

  try {
    const ordersResult = await db.query(
      `SELECT o.id, o.order_reference, o.order_date, oi.product_id, oi.supplier_id, oi.quantity
         FROM orders o
         JOIN order_items oi ON o.id = oi.order_id
         WHERE o.customer_id = $1`,
      [customerId]
    );

    const orders = ordersResult.rows.reduce((acc, row) => {
      const order = acc.find((o) => o.id === row.id);
      if (order) {
        order.items.push({
          product_id: row.product_id,
          supplier_id: row.supplier_id,
          quantity: row.quantity,
        });
      } else {
        acc.push({
          id: row.id,
          order_reference: row.order_reference,
          order_date: row.order_date,
          items: [
            {
              product_id: row.product_id,
              supplier_id: row.supplier_id,
              quantity: row.quantity,
            },
          ],
        });
      }
      return acc;
    }, []);

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(400).send("An error occurred while retrieving orders");
  }
});

module.exports = router;
