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

//2. As a user, I want to search for products by name.

describe("GET /products/:name", () => {
  it("should return a product with the specified name", async () => {
    const response = await request(app).get("/products/coffee");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Coffee Cup"
        })
      ])
    );
  });
});


//3. As a user, I want to view a single customer by their ID.

describe("GET /customers/:id", () => {
  it("should return a single customer by their ID", async () => {
    const response = await request(app).get("/customers/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Guy Crawford",
          address: "770-2839 Ligula Road",
          city: "Paris",
          country: "France"
        }),
      ])
    );
  });
});

//4. As a user, I want to create a new customer with their name, address, city, and country.