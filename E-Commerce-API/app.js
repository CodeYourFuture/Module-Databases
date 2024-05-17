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



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening to port ${port}!`);
})

export default app; 
