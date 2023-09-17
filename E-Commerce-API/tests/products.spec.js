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

describe("GET /products/:name", () => {
  it("I want to search for product by name", async () => {
    const response = await request(app).get("/products/ball");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Ball",
        }),
      ])
    );
  });
});

describe("GET /customers/:customerId", () => {
  it(`should load a single customer by their ID`, async () => {
    const customerId = 1;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      })
    );
  });
});

describe("POST /customers/newCustomer", () => {
  it("should create a new customer with name, address, city, and country", async () => {
    const newCustomer = {
      name: "beko TDD",
      address: "123 Cyf St",
      city: "Sample City",
      country: "Sample Country",
    };
    const response = await request(app)
        .post("/customers").send(newCustomer)
      expect(response.status).toBe(201);
  });
});

describe("POST /products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      product_name: "simple product",
    };
    const response = await request(app)
        .post("/products").send(newProduct);
      expect(response.status).toBe(201);
  });
});

