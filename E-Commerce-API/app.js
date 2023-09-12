const express = require("express");
const app = express();
require("dotenv").config({ path: "database.env" });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/products", (req, res) => {
  let nameLooked = req.query.name;
  if (nameLooked) {
    db.query(
      `select product_name as name, unit_price as price, supplier_name as "supplierName" from products p join product_availability pa on p.id = pa.prod_id join suppliers s on s.id = pa.supp_id where product_name ilike $1`,
      [`%${nameLooked}%`]
    )
      .then((result) => res.json(result.rows))
      .catch((err) => res.json(err));
  } else {
    db.query(
      'select product_name as name, unit_price as price, supplier_name as "supplierName" from products p join product_availability pa on p.id = pa.prod_id join suppliers s on s.id = pa.supp_id'
    )
      .then((result) => res.json(result.rows))
      .catch((err) => res.json(err));
  }
});

app.post("/products", (req, res) => {
  let name = req.body.product_name;
  db.query(
    "insert into products (product_name) values ($1) RETURNING id, product_name",
    [name]
  )
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => res.json(err));
});

app.get("/customers/:customerId/orders", (req, res) => {
    const custId = req.params.customerId;
    db.query(
      "select o.order_reference, o.order_date, p.product_name, pa.unit_price, s.supplier_name, oi.quantity from orders o join customers c on (o.customer_id = c.id) join order_items oi on (o.id = oi.order_id) join products p on (oi.product_id = p.id) join suppliers s on (oi.supplier_id = s.id) join product_availability pa on (oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id) where c.id = $1", [custId])
      .then(result => res.status(200).json(result.rows))
      .catch(err => res.json(err));    
      console.log(process.env.DB_HOST);
      console.log(process.env.DB_DATABASE);
      console.log(process.env.DB_PORT);  
});

app.get("/customers/:customerId", (req, res) => {
    let id = req.params.customerId;
    db.query('select id, name, address, city, country from customers where id = $1', [id])
    .then(result => res.json(result.rows[0]))
    .catch(err => res.json(err));
});

app.post("/customers/:customerId/orders", async (req, res) => {
    const { order_date, order_reference} = req.body;
    const customer_id = Number(req.params.customerId);

    const ifCustomerExists = await db.query("select * from customers where id = $1", [customer_id]);

    if(ifCustomerExists.rows.length === 0) {
        return res.status(400).json({error: "Customer with such ID not found"})
    }
    db.query(
      "insert into orders (order_date, order_reference, customer_id) values ($1, $2, $3) returning id, to_char(order_date, 'YYYY-MM-DD') as order_date, order_reference, customer_id",
      [order_date, order_reference, customer_id]
    )
      .then((result) => res.status(201).json(result.rows[0]))
      .catch((err) => res.json(err));
});

app.post("/customers/:customerId", (req, res) => {
    const {name, address, city, country} = req.body;
    const customer_id = req.params.customerId;
    db.query("update customers set name = $1, address = $2, city = $3, country = $4 where id = $5 returning *", [name, address, city, country, customer_id])
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => res.json(err))
});

app.delete("/customers/:customerId", async (req, res) => {
    const cust_id = req.params.customerId;
    const ifOrders = await db.query("select * from orders where customer_id = $1", [cust_id]);
    if(ifOrders.rows.length > 0){
        return res
          .status(400)
          .json({
            error: "Customer has existing orders and cannot be deleted.",
          });
    }
    db.query("delete from customers where id = $1", [cust_id])
    .then(result => res.sendStatus(204))
    .catch(err => res.json(err));
});

app.post("/customers", (req, res) => {
  const { name, address, city, country } = req.body;
  db.query(
    "insert into customers (name, address, city, country) values ($1, $2, $3, $4) returning id, name, address, city, country",
    [name, address, city, country]
  )
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => res.json(err));
});

app.post("/availability", async (req, res) => {
    const {prod_id, supp_id, unit_price} = req.body;
    if(unit_price < 0){
        return res.status(400).json({ Error: "Price cannot be below 0" });
    }
    const ifProduct = await db.query("select * from products where id = $1", [prod_id]);
    if(ifProduct.rows.length === 0){
        return res.status(400).json({Error: "Product with such ID does not exist"})
    }
    const ifSupplier = await db.query("select * from suppliers where id = $1", [supp_id]);
    if(ifSupplier.rows.length === 0) {
        return res.status(400).json({ Error: "Supplier with such ID does not exist" });
    }
    db.query("insert into product_availability (prod_id, supp_id, unit_price) values ($1, $2, $3) returning *", [prod_id, supp_id, unit_price])
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => res.json(err));
})

app.delete("/orders/:orderId", (req, res) => {
    const order_id = req.params.orderId;
    db.query("delete from order_items where order_id = $1", [order_id])
    .then(() => {
        return db.query("delete from orders where id = $1", [order_id]);
    })    
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err));
});

app.listen(5000, function () {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

module.exports = app;
