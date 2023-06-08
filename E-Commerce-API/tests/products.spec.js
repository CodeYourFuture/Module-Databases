const request = require("supertest");
const app = require("../app");

describe("GET /products", () => {
  it("should return a list of all product names with their prices and supplier names", async () => {
    let response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          supplier_name: expect.any(String),
        }),
      ])
    );
  });

  it("should return a list of products matching the name query", async () => {
    const productName = "book";
    let response = await request(app).get(`/products?name=${productName}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          supplier_name: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /customers/:id", () => {
  it("should return the customer with the specified ID", async () => {
    const customerId = 4;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: customerId,
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        }),
      ])
    );
  });

  it("should return 500 if the customer ID is not a number", async () => {
    const nonExistentId = "lala";
    const response = await request(app).get(`/customers/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Internal Server Error",
      })
    );
  });

  it("should return 404 if the customer ID does not exist", async () => {
    const nonExistentId = 56;
    const response = await request(app).get(`/customers/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Customer does not exist",
      })
    );
  });
});

describe("POST /customers", () => {
  it("should create a new customer including name, address, city, country", async () => {
    const newCustomer = {
      name: "Lorena Capraru",
      address: "100 Princes Close",
      city: "London",
      country: "UK",
    };
   const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: newCustomer.name,
        address: newCustomer.address,
        city: newCustomer.city,
        country: newCustomer.country,
      })
    );
  });
});

module.exports = app;
