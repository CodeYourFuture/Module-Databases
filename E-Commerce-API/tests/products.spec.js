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

  it("should return 404 if the customer ID does not exist", async () => {
    const nonExistentId = "nonexistent-id";

    const response = await request(app).get(`/customers/${nonExistentId}`);

    expect(response.status).toBe(500);
  });
});

module.exports = app;
