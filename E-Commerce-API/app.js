
const express = require("express");
const app = express();

require('dotenv').config()
// Your code to run the server should go here
const { Pool } = require("pg");

const db = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


//As a user, I want to view a list of all products with their prices and supplier names.

app.get("/products", async function (req, res) {
    await db.query('SELECT products.product_name AS name, product_availability.unit_price AS price, suppliers.supplier_name AS "supplierName" FROM products JOIN product_availability ON (products.id = product_availability.prod_id) JOIN suppliers ON (suppliers.id = product_availability.supp_id)')
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

//2. As a user, I want to search for products by name.

app.get("/products/:name", function (req, res) {
    let searchName = req.params.name
    db.query("SELECT products.product_name AS name FROM products WHERE product_name ILIKE $1 || '%'", [searchName])
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

//3. As a user, I want to view a single customer by their ID.

app.get("/customers/:id", function (req, res) {
    let searchID = parseInt(req.params.id)
    db.query("SELECT * FROM customers WHERE id = $1", [searchID])
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});





// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

module.exports = app;
