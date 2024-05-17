import express from "express";
import 'dotenv/config';
import pg from "pg"
const { Pool } = pg;
const app = express();
app.use(express.json());

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/products', async (req, res) => {
    try {
        const result = await db.query('select p.product_name, pa.unit_price ,s.supplier_name from products p inner join product_availability pa on (p.id = pa.prod_id) inner join suppliers s on (s.id =pa.supp_id);');
        res.send(result.rows);
    } catch (error) {
        res.send(500);
    }
})

app.get('/products/:name', async (req, res) => {
    console.log(req.params.name);
    try {
        const name = req.params.name;
        const result = await db.query(`SELECT product_name FROM products WHERE product_name ILIKE '%${name}%';`);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(400).send(`failed to get searched name`);
    }
});

app.get('/customers/:id', async (req, res) => {
    try {
        const result = await db.query('select * from customers where id= $1;', [req.params.id])
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(400).send('Customer not found!')
    }
})

app.post('/customers', async (req, res) => {
    try {
        await db.query(`INSERT INTO customers (name, address, city, country)
        VALUES($1,$2, $3, $4)`, [req.body.name, req.body.address, req.body.city, req.body.country]);
        res.status(201).send('Added the customer successfully');
    } catch (error) {
        res.status(500).send(`failed to add new customer! ${error}`)
    }
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening to port ${port}!`);
})

export default app; 
