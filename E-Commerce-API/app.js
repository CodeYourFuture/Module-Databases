import express from "express";
import 'dotenv/config';
import pg from "pg"
const { Pool } = pg;

const app = express();
app.use(express.json());

// Configure PostgreSQL connection using environment variables
const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Route to fetch all products with prices and supplier name
app.get('/products', async (req, res) => {
    try {
        const result = await db.query('SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p INNER JOIN product_availability pa ON (p.id = pa.prod_id) INNER JOIN suppliers s ON (s.id = pa.supp_id);');
        res.send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to search for products by name
app.get('/products/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const result = await db.query(`SELECT product_name FROM products WHERE product_name ILIKE '%$1%';`, [name]);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to get searched name');
    }
});

// Route to fetch the customer by ID
app.get('/customers/:customerId', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customers WHERE id = $1;', [req.params.customerId]);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(400).send('Customer not found!');
    }
});

// Route for a new customer
app.post('/customers', async (req, res) => {
    try {
        await db.query(`INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)`, [req.body.name, req.body.address, req.body.city, req.body.country]);
        res.status(201).send('Added the customer successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add new customer!');
    }
});

// Route for new product
app.post('/products', async (req, res) => {
    try {
        await db.query(`INSERT INTO products (product_name) VALUES ($1)`, [req.body.product_name]);
        res.status(201).send('Added the new product successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add new product!');
    }
});

// Route for  new product availability
app.post('/availability', async (req, res) => {
    try {
        if (req.body.unit_price > 0) {
            await db.query(`INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ((SELECT id FROM products WHERE id = $1), $2, $3)`, [req.body.prod_id, req.body.supp_id, req.body.unit_price]);
            res.status(201).send('Added the new entry in product availability successfully');
        } else {
            res.status(404).send('Price cannot be below zero!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add new entry in product availability!');
    }
});

// route for new order for a customer
app.post('/customers/:customerId/orders', async (req, res) => {
    try {
        const customerResult = await db.query(`SELECT id FROM customers WHERE id = $1`, [req.params.customerId]);
        if (customerResult.rows.length > 0) {
            await db.query(`INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)`, [req.body.order_date, req.body.order_reference, req.params.customerId]);
            res.status(201).send('Successfully added the order!');
        } else {
            res.status(400).send('Customer ID is not valid');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add order!');
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening to port ${port}!`);
});

export default app;