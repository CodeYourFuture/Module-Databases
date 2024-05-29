const express = require("express");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// get all products
app.get("/products", async (req, res) => {
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

// get product by name, showing name, price and supplier name
app.get("/products/:name", async (req, res) => {
  const { name } = req.params;
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
})

// get customer by id
app.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
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
})

module.exports = server;
