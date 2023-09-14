const request = require("supertest");
const app = require("../app");

// 1. As a user, I want to view a list of all products with their prices and supplier names.
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

// 2. As a user, I want to search for products by name.
describe("GET /products/:name", () => {
  it("should return a list of all product names which match search query", async () => {
    const response = await request(app).get("/products/mobile");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "mobile",
        }),
      ])
    );
  });
});

// 3. As a user, I want to view a single customer by their ID.
// 4. As a user, I want to create a new customer with their name, address, city, and country.
