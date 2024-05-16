// const express = require("express");
// const app = express();
// const { Pool } = require("pg");
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj
const express = require("express");

const { Pool } = require("pg");
const app = express();
app.use(express.json());
const port = 3000;
// const db = new Pool({
//   user: process.env.DB_USERNAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   username: process.env.DB_USERNAME,
//   //   password: process.env.DB_PASSWORD,
//   password: process.env.DB_PASSWORD,
// });

app.listen(port, () => {
  console.log("Listening on port:", port);
});

const db = new Pool({
  user: "behrouzkarimi",
  host: "localhost",
  password: "behrouz",
  database: "e_commerce",
  port: 5432,
});

//This endpoint returns all the products with name price and suppliername
//If user search for an item using query parameter it return the item if available
app.get("/products", async (req, res) => {
  const queryParam = req.query.search;

  try {
    //If no query parametre defined by the user
    if (queryParam === undefined) {
      const products = await db.query(
        "SELECT pr.product_name AS NAME , pa.unit_price AS price, sp.supplier_name AS supplierName FROM product_availability pa JOIN suppliers sp ON(pa.supp_id=sp.id) JOIN products pr ON (pa.prod_id=pr.id);"
      );
      res.status(200).send(products.rows);
    }
    //If user search for a specific item
    else {
      const queriedSearch = await db.query(
        "SELECT pr.product_name AS NAME , pa.unit_price AS price, sp.supplier_name AS supplierName FROM product_availability pa JOIN suppliers sp ON(pa.supp_id=sp.id) JOIN products pr ON (pa.prod_id=pr.id) WHERE pr.product_name=$1;",
        [queryParam]
      );
      if (queriedSearch.rows.length !== 0) {
        res.status(200).json(queriedSearch.rows);
      } else {
        res
          .status(404)
          .json({ message: "No products found for the searched term." });
      }
    }
  } catch (err) {
    console.error(err, "<----Error happened");
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customers/:customerId", async (req, res) => {
  const idOfCustomer = req.params.customerId;
  console.log(idOfCustomer, "id of customer");
  try {
    const foundCustomer = await db.query(
      "SELECT * FROM customers WHERE id=$1",
      [idOfCustomer]
    );
    if (foundCustomer.rows.length !== 0) {
      res.status(200).json(foundCustomer.rows);
    } else {
      res.status(404).json({ message: "Customer with the id -1 not found!" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

app.post("/customers", (req, res) => {
  const bodyData = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };

  try {
    if (bodyData.name !== "" && bodyData.name !== undefined) {
      const insertCustomer = db.query(
        "INSERT INTO customers(name, address, city, country) VALUES ($1, $2, $3, $4)",
        [bodyData.name, bodyData.address, bodyData.city, bodyData.country]
      );
      res.status(200).json({ message: "Customer created successfully" });
    } else {
      res.status(400).json({ Error: "Bad Request! Name can not be empty" });
    }
  } catch (error) {
    console.error("Error inserting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/products", async (req, res) => {
  const bodyData = {
    productName: req.body.productName,
  };
  try {
    if (
      bodyData.productName !== undefined &&
      bodyData.productName !== "" &&
      bodyData.productName !== null
    ) {
      const productInsertion = db.query(
        "INSERT INTO products(product_name) VALUES ($1)",
        [bodyData.productName]
      );
      res.status(200).json({ message: "New product created successfully" });
    } else {
      res
        .status(400)
        .json({ error: "Bad request! This product can not be created!" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error. inseryion failed!" });
  }
});

//Availibality endpoint to add new available product
app.post("/availability", async (req, res) => {
  const bodyData = {
    prodId: req.body.prodId,
    suppId: req.body.suppId,
    unitPrice: parseInt(req.body.unitPrice),
  };
  console.log(bodyData);
  try {
    //this is an exist clause going to be used to check if prod_id and supp_id exist in the table
    const queryCheckAvailibility =
      "SELECT EXISTS(SELECT 1 FROM products WHERE id=$1) AS product_id_exists,EXISTS(SELECT 1 FROM suppliers WHERE id=$2) AS supplier_id_exists;";

    const prodIdExist = await db.query(
      "SELECT EXISTS(SELECT 1 FROM products WHERE id=$1)AS prod_id",
      [bodyData.prodId]
    );

    const suppIdExist = await db.query(
      "SELECT EXISTS(SELECT 1 FROM suppliers WHERE id=$1) AS supp_id",
      [bodyData.suppId]
    );
    //check for duplicate values in the db
    const duplicateKeyValue = await db.query(
      "SELECT * FROM product_availability WHERE prod_id=$1 AND supp_id=$2",
      [bodyData.prodId, bodyData.suppId]
    );

    const areAvailable = await db.query(queryCheckAvailibility, [
      bodyData.prodId,
      bodyData.suppId,
    ]);

    if (bodyData.unitPrice >= 0 && Number.isInteger(bodyData.unitPrice)) {
      if (!prodIdExist.rows[0].prod_id) {
        res
          .status(400)
          .json({ error: "Bad request! Product id does not exist in the DB" });
      } else if (!suppIdExist.rows[0].supp_id) {
        res
          .status(400)
          .json({ error: "Bad request! supplier id does not exist in the DB" });
      } else if (duplicateKeyValue.rows.length !== 0) {
        res
          .status(400)
          .json({ error: "Bad request! Duplicate values can not be inserted" });
      } else {
        const insertProductAvailability = await db.query(
          "INSERT INTO product_availability(prod_id , supp_id , unit_price) VALUES($1 , $2 , $3)",
          [bodyData.prodId, bodyData.suppId, bodyData.unitPrice]
        );
        res
          .status(200)
          .json({ message: "New product available created successfully" });
      }
    } else {
      res.status(400).json({
        error: "Bad request! Price should be a pasitive integer value",
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

app.post("/customers/:customerId/orders", async (req, res) => {
  const customerID = req.params.customerId;
  console.log(customerID, "this is customer id");
  const bodyData = {
    customerId: customerID,
    orderDate: req.body.orderDate,
    orderReference: req.body.orderReference,
  };
  // check for existence of customer
  const customerExist = await db.query(
    " SELECT EXISTS(SELECT 1 FROM customers WHERE id=$1) AS customer_id",
    [customerID]
  );

  //check if date format is invalid
  function isValidDate(stringDate) {
    return !isNaN(Date.parse(stringDate));
  }

  try {
    //if customer does not exist return an error message
    if (!customerExist.rows[0].customer_id) {
      res
        .status(400)
        .json({ error: "Bad request! The customer does not exist" });
    } else if (
      !bodyData.orderDate ||
      bodyData === "" ||
      !isValidDate(bodyData.orderDate)
    ) {
      res.status(400).json({
        error:
          "Bad request! Order date is not valid. check nullity or date format",
      });
    }
    //check nullity or emptiness of order reference
    else if (!bodyData.orderReference || bodyData.orderReference === "") {
      res.status(400).json({
        error: "Bad request! Order reference can not be null or empty",
      });
    } else {
      const insertOrder = await db.query(
        "INSERT INTO orders(order_date , order_reference , customer_id) VALUES($1 , $2 , $3)",
        [bodyData.orderDate, bodyData.orderReference, bodyData.customerId]
      );
      res
        .status(200)
        .json({ message: "New order created successfully for customer" });
    }
  } catch (error) {
    console.error("Error: ", error),
      res.status(500).json({ Error: "Internal server error" });
  }
});

app.post("/customers/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const bodyData = {
    id: customerId,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };
  const customerExist = await db.query(
    "SELECT EXISTS (SELECT 1 FROM customers WHERE id=$1) AS customer_exist",
    [bodyData.id]
  );
  try {
    if (!customerExist.rows[0].customer_exist) {
      res.status(400).json({ error: "Customer does not exist in the DB" });
    } else if (!bodyData.name || bodyData.name === "") {
      res.status(400).json({
        error: "Bad request! customer name can not be empty or null!",
      });
    } else {
      const updatedCustomer = await db.query(
        "UPDATE customers SET name=$1 , address=$2 , city=$3 , country = $4 WHERE id=$5",
        [
          bodyData.name,
          bodyData.address,
          bodyData.city,
          bodyData.country,
          bodyData.id,
        ]
      );
      res.status(200).json({ message: "Customer updated successfully" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

//Delete an order with all its items
app.delete("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  if (isNaN(orderId)) {
    return res
      .status(400)
      .json({ error: "Bad request! Order id format is not correct" });
  }
  try {
    const orderExist = await db.query(
      "SELECT EXISTS (SELECT 1 FROM orders WHERE id=$1) AS order_exist",
      [orderId]
    );
    if (!orderExist.rows[0].order_exist) {
      return res
        .status(404)
        .json({ error: "Order did not find to be deleted" });
    }
    //starting the deleetion transaction
    await db.query("BEGIN");
    //delete from order items fisrt from order_items
    const deleteOrderItems = await db.query(
      "DELETE FROM order_items WHERE order_id=$1",
      [orderId]
    );
    //delete the order
    const deleteOrder = await db.query("DELETE FROM orders WHERE ID=$1", [
      orderId,
    ]);
    await db.query("COMMIT");
    return res
      .status(200)
      .json({ message: "The order with all its items deleted successfully" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
});

// endpoint to delete a customer without any order
app.delete("/customers/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  //if id does not have a correct format not a number or not an integer
  const isIdValId = isNaN(customerId) || !Number.isInteger(Number(customerId));
  if (isIdValId) {
    return res.status(400).json({
      error: "Customer id format is not correct.should be an integer",
    });
  }
  try {
    const customerExist = await db.query(
      "SELECT EXISTS (SELECT 1 FROM customers WHERE id=$1) AS customer_exist",
      [customerId]
    );
    if (!customerExist.rows[0].customer_exist) {
      return res.status(404).json({ error: "Customer does not exist" });
    } else {
      const customerHasOrder = await db.query(
        "SELECT 1 FROM orders WHERE customer_id=$1",
        [customerId]
      );
      if ((await customerHasOrder).rows.length !== 0) {
        return res.status(400).json({
          warning: "Customer has made some orders, you can not delete them!",
        });
      } else {
        const deleteCustomer = await db.query(
          "DELETE FROM customers WHERE id=$1",
          [customerId]
        );
        return res
          .status(200)
          .json({ message: "Customer deleted successfully" });
      }
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customers/:customerId/orders", async (req, res) => {
  const customerId = req.params.customerId;
  if (isNaN(customerId) || !customerId) {
    return res.status(400).json({ error: "customer id is not valid" });
  }
  try {
    const customeIdExist = await db.query(
      "SELECT EXISTS(SELECT 1 FROM customers WHERE ID=$1 ) AS customer_exist",
      [customerId]
    );
    if (!customeIdExist.rows[0].customer_exist) {
      return res.status(404).json({ error: "customer not found" });
    } else {
      const customerDetails = await db.query(
        "select o.order_reference , o.order_date , pr.product_name , s.supplier_name , oi.quantity, pa.unit_price  from orders o join order_items oi on (o.id=oi.order_id) join suppliers s on(oi.supplier_id=s.id) join products pr on (oi.product_id=pr.id) join product_availability pa on(oi.product_id=pa.prod_id) where o.customer_id=$1",
        [customerId]
      );
      return res.status(200).json(customerDetails.rows);
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = app;
