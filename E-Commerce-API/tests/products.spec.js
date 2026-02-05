import request from "supertest";
import app from "../src/app.js";

describe("E-commerce API Tests", () => {
  describe("GET /products", () => {
    it("should return a list of all product names with their prices and supplier names", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            product_name: expect.any(String),
            unit_price: expect.any(Number),
            supplier_name: expect.any(String),
          }),
        ])
      );
    });

    it("should filter the list of products by name using a query parameter", async () => {
      const response = await request(app).get("/products?name=Product 1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            product_name: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("GET /customers/:customerId", () => {
    it("should return a single customer by their ID", async () => {
      const response = await request(app).get("/customers/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        })
      );
    });
  });

  describe("POST /customers", () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      country: "USA",
    };

    it("should create a new customer", async () => {
      const response = await request(app)
        .post("/customers")
        .send(newCustomer)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
    });
  });

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const response = await request(app)
        .post("/products")
        .send({ product_name: "New Product" })
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
    });
  });

  describe("POST /availability", () => {
    it("should create a new product availability", async () => {
      const response = await request(app)
        .post("/availability")
        .send({
          prod_id: 1,
          supp_id: 2,
          unit_price: 20,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
    });

    it("should return an error if the price is not a positive integer", async () => {
      const response = await request(app)
        .post("/availability")
        .send({
          prod_id: 1,
          supp_id: 2,
          unit_price: -2,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });

    it("should return an error if the product ID is missing", async () => {
      const response = await request(app)
        .post("/availability")
        .send({
          prod_id: null,
          supp_id: 2,
          unit_price: 20,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });

    it("should return an error if the supplier ID is missing", async () => {
      const response = await request(app)
        .post("/availability")
        .send({
          prod_id: 1,
          supp_id: null,
          unit_price: 20,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });
  });

  describe("POST /customers/:customerId/orders", () => {
    it("should create a new order for a customer", async () => {
      const response = await request(app)
        .post("/customers/1/orders")
        .send({
          order_date: "2024-01-01",
          order_reference: "ORD001",
          customer_id: 1,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
    });

    it("should return an error if the customer ID is invalid", async () => {
      const response = await request(app)
        .post("/customers/1/orders")
        .send({
          order_date: "2024-01-01",
          order_reference: "ORD001",
          customer_id: -1, // invalid customer ID
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
    });
  });
});
