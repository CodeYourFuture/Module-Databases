const request = require("supertest");
const app = require("../app");

describe("GET /products", () => {
  it("should return a list of all product names with their prices and supplier names", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          supplierName: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /products?search=<search term>", () => {
  it("should return a list of products matching the search term", async () => {
    const searchTerm = "Ball"; // Replace with the desired search term

    const response = await request(app).get(`/products?search=${searchTerm}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringContaining(searchTerm),
          price: expect.any(Number),
          supplierName: expect.any(String),
        }),
      ])
    );
  });
});

// As a user, I want to create a new product.
app.post("/products", (req, res) => {
  const { name, price, supplierName } = req.body;
  db.query(
    "INSERT INTO products (product_name, price, supplier_name) VALUES ($1, $2, $3) RETURNING *",
    [name, price, supplierName],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const product = result.rows[0];
        res.status(201).json(product);
      }
    }
  );
});

// As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
app.post("/availability", (req, res) => {
  const { productId, supplierId, price } = req.body;
  if (price < 0) {
    res.status(400).json({ error: "Price must be a positive integer" });
  } else {
    db.query(
      "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *",
      [productId, supplierId, price],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const availability = result.rows[0];
          res.status(201).json(availability);
        }
      }
    );
  }
});
