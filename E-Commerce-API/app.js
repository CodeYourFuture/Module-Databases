import express from "express";
import 'dotenv/config';
import pg from "pg"
const { Pool } = pg;
const app = express();

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
    try {
        const name = req.params.name;
        const result = await db.query(`SELECT product_name FROM products WHERE product_name ILIKE '%${name}%';`);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(400).send(`failed to get searched name`);
    }
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening to port ${port}!`);
})

export default app; 
