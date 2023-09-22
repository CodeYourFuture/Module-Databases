require("dotenv").config();
const express = require("express");
const app = express();
const env = require("./env");

app.use(express.json());
// db.connect;

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

app.get("/", (req, res) => {
  res.send("this server is running on port 3006....");
});

app.get("/products", (req, res) => {
  env
    .query(
      ` select p.product_name AS name, pa.unit_price AS price, s.supplier_name As "supplierName"
        from products p
        join product_availability pa
        on p.id = pa.prod_id
        join suppliers s
        on pa.supp_id = s.id
      `
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/products/:name", (req, res) => {
  const searchName = req.params.name;
  const query =
    " SELECT product_name As name FROM products WHERE product_name ILIKE $1 || '%' ";

  env
    .query(query, [`%${searchName}%`])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/customers/:customerId", (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const query = `SELECT id, name FROM customers WHERE id = $1`;

  env
    .query(query, [customerId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(400).json({ error: "customer id not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/customers", (req, res) => {
  try {
    const newName = req.body.name;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const newCountry = req.body.country;

    if (!newName || !newAddress || !newCity || !newCountry) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `INSERT INTO customers (name, address, city, country)
    VALUES ($1, $2, $3, $4)`;

    env
      .query(query, [newName, newAddress, newCity, newCountry])
      .then(() => {
        res.status(201).send("Created a new customer");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/products", (req, res) => {
  try {
    const newProduct = req.body.product_name;

    if (!newProduct) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `INSERT INTO products (product_name)
                    VALUES ($1)`;

    env
      .query(query, [newProduct])
      .then(() => {
        res.status(201).send("Created a new product");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`listen on port ${port} ..`));
module.exports = app;
