const request = require("supertest");
const { describe, it, expect } = require("jest");
const app = require("../app");
// As a user, I want to view a list of all products with their prices and supplier names.
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
//As a user, I want to search for products by name.
describe("GET /products/search", () => {
  it("should return products matching the given name", async () => {
    const response = await request(app).get("/products/search?name=Phone");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          product_name: "Mobile Phone X",
        }),
      ])
    );
  });
});
//As a user, I want to view a single customer by their ID.
describe("GET /customers/:id", () => {
  it("should return customer details for the given ID", async () => {
    const customerId = 4;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: customerId,
        name: "Amber Tran",
        address: "6967 Ac Road",
        city: "Villafranca Asti",
        country: "United States",
      })
    );
  });
});

//As a user, I want to create a new customer with their name, address, city, and country.
describe("POST /customers", () => {
  it("should create a new customer with valid information", async () => {
    const newCustomer = {
      name: "Andrius Isin",
      address: "liverpool street",
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
