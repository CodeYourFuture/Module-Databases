import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import pg from "pg";

const app = express();
const port = process.env.SERVER_PORT;
app.use(bodyParser.json());

const { Pool } = pg;
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/products", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT pro.product_name, sup.supplier_name, pa.unit_price FROM products pro JOIN suppliers sup ON pro.id = sup.id JOIN product_availability pa ON pa.supp_id = sup.id"
    );

    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //get by name
app.get("/products/:name", (req, res) => {
  let productName = req.params.name;
  productName = productName.replace(/-/g, " ");
  db.query(
    "SELECT pro.product_name, sup.supplier_name, pa.unit_price FROM products pro JOIN suppliers sup ON pro.id = sup.id JOIN product_availability pa ON pa.supp_id = sup.id WHERE lower(pro.product_name) LIKE $1 || '%'",
    [productName.toLowerCase()]
  ).then((result) => res.json(result.rows));
});

// //get customers by id
app.get("/customers/:id", function (req, res) {
  const custId = parseInt(req.params.id);
  db.query("SELECT * FROM customers WHERE id = $1", [custId])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

// //post customers
app.post("/customers", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const query = `INSERT INTO customers(name, address, city, country)VALUES($1,$2,$3,$4)`;
  db.query(query, [name, address, city, country])
    .then(() => {
      res
        .status(201)
        .send({ message: "created a new customer was successfully !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

// //post product
app.post("/products", (req, res) => {
  const productName = req.body.product_name;
  const query = `INSERT INTO products(product_name)VALUES($1)`;
  db.query(query, [productName])
    .then(() => {
      res
        .status(201)
        .send({ message: "created a new product was successfully !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: {
          message: "internal server error",
          type: "database error",
        },
      });
    });
});

//post
//to be continue for nex
app.post("/availability", (req, res) => {
  // Extracting data from request body
  const { prod_id, unit_price, supp_id } = req.body;

  // Checking if unit_price is a positive integer
  if (!Number.isInteger(unit_price) || unit_price <= 0) {
    return res.status(400).json({
      error: {
        message: "Unit price must be a positive integer.",
        type: "validation error",
      },
    });
  }

  // Checking if supp_id is provided
  if (!supp_id) {
    return res.status(400).json({
      error: {
        message: "Supplier ID is required.",
        type: "validation error",
      },
    });
  }

  // Inserting into the database
  const query =
    "INSERT INTO product_availability(prod_id,unit_price, supp_id) VALUES($1, $2,$3)";
  db.query(query, [prod_id, unit_price, supp_id])
    .then(() => {
      res.status(201).json({
        message: "New product availability was successfully created!",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: {
          message: "Internal server error.",
          type: "database error",
        },
      });
    });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server listening on port ${port} !`);
  });
}

export default app;
