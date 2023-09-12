const express = require("express");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();
app.use(express.json());

const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.listen(5001, () => {
  console.log("Connected");
});

app.get("/", (request, response) => {
  response.send("HEllo");
});

//display products
app.get("/products", (request, res) => {
  db.query(
    `SELECT p.product_name,
    pa.unit_price,
    s.supplier_name
    FROM product_availability pa 
    JOIN products p 
    ON pa.prod_id = p.id
    JOIN suppliers s ON pa.supp_id = s.id `
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
//display products by name
app.get("/products/:name", (req, res) => {
  const productName = req.params.name;

  db.query(
    `
    SELECT p.product_name,pa.unit_price,s.supplier_name
    FROM product_availability pa
    JOIN products p ON pa.prod_id = p.id
    JOIN suppliers s ON pa.supp_id = s.id
    WHERE p.product_name ILIKE $1
    `,
    [`%${productName}%`],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const newResult = result.rows.map((item) => ({
        name: item.product_name,
        price: item.unit_price,
        supplierName: item.supplier_name,
      }));
      res.json(newResult);
    }
  );
});

// display all customers
app.get("/customers", (req, res) => {
  db.query(`SELECT * FROM customers`)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// select customer by id
app.get("/customers/:customerId", (req, res) => {
  const customerId = parseInt(req.params.id);

  db.query(
    `
    SELECT * FROM customers
    WHERE id = $1
    `,
    [customerId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "server Error" });
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(result.rows[0]);
    }
  );
});

// create customer with details
app.post("/customers", (req, res) => {
  const { name, address, city, country } = req.body;

  db.query(
    `INSERT INTO customers (name, address, city, country) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, address, city, country]
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    });
});

app.post("/products", (req, res) => {
  const product_name = req.body;

  db.query(`INSERT INTO products (product_name) VALUES ($1) RETURNING *`, [
    product_name,
  ])
    .then((result) => [res.json(result)])
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    });
});

app.post("/availability", (req, res) => {
  const { prod_id, supp_id, unit_price } = req.body;

  if (!Number.isInteger(unit_price) || unit_price <= 0) {
    return res.status(400).json({ error: "Price must be a positive integer" });
  }

  // Check if the product with prod_id exists
  db.query("SELECT * FROM products WHERE id = $1", [prod_id])
    .then((productResult) => {
      if (productResult.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      db.query("SELECT * FROM suppliers WHERE id = $1", [supp_id])
        .then((supplierResult) => {
          if (supplierResult.rows.length === 0) {
            return res.status(404).json({ error: "Supplier not found" });
          }

          db.query(
            "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
            [prod_id, supp_id, unit_price]
          )
            .then((availabilityResult) => {
              const newAvailability = availabilityResult.rows[0];
              res.json(newAvailability);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ error: "Server Error" });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Server Error" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    });
});

app.post("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  const { orderDate, orderReference } = req.body;

  db.query("SELECT * FROM customers WHERE id = $1", [customerId])
    .then((customerResult) => {
      if (customerResult.rows.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      db.query(
        "INSERT INTO orders (customer_id, order_date, order_reference) VALUES ($1, $2, $3) RETURNING *",
        [customerId, orderDate, orderReference]
      )
        .then((orderResult) => {
          const newOrder = orderResult.rows[0];
          res.json(newOrder);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Server Error" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    });
});
//update customer by id
app.put("/customers/:customerId", (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const { name, address, city, country } = req.body;

  db.query(
    `UPDATE customers SET name = $1, address = $2, city = $3, country = $4 WHERE id=$5 RETURNING*`,
    [name, address, city, country, customerId]
  )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const updatedCustomer = result.rows[0];
      res.json(updatedCustomer);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    });
});

//delete order by id

app.delete("/order/:orderId", (req, res) => {
  const orderId = parseInt(req.params.orderId);

  db.query(`DELETE FROM orders WHERE id =$1`, [orderId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.statusMessage(404).json({ error: "Order is not found" });
      }

      const deletedOrder = result.rows[0];
      res.json(deletedOrder);
    })
    .catch((error) => {
      console.log.error(error);
      res.status(500).json({ error: "Server error" });
    });
});

//delete a customer by id if doesnt has any order
app.delete("/cutomers/:customerId", (req, res) => {
  const customerId = parseInt(req.params.customerId);
  ///if customer has a order
  db.query(`SELECT * FROM orders WHERE customer_id =$1`, [customerId])
    .then((orderResult) => {
      if (orderResult.rows.length > 0) {
        return res.status(404).json({ error: "Customer has orders" });
      }

      //if hasnt any order , delete it
      db.query(`DELETE FROM customers WHERE id=$1 RETURNING *`, [
        customerId,
      ]).then((result) => {
        return res.status(404).json({ error: "Customer is not found" });
      });
      const deletedCustomer = result.rows[0];
      res.json(deletedCustomer);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    });
});
//SLECT all the orders with the items in the orders of a specific customer
app.get("/customers/:customerId/orders", (req, res) => {
  const customerId = parseInt(req.params.customerId);
  db.query(
    `
    SELECT
      o.order_reference,
      o.order_date,
      p.product_name,
      pa.unit_price,
      s.supplier_name,
      oi.quantity
    FROM
      orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      JOIN product_availability pa ON p.id = pa.prod_id
      JOIN suppliers s ON pa.supp_id = s.id
    WHERE
      o.customer_id = $1
    `,
    [customerId]
  )
    .then((result) => {
      const ordersWithItems = result.rows;
      res.json(ordersWithItems);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

module.exports = app;
