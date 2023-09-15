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
          suppliername: expect.any(String),
        }),
      ])
    );
  });
});
describe("GET /products/:name", () => {
  it("should return all product names with the matching name ", async () => {
    const response = await request(app).get("/products/super warm socks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          suppliername: expect.any(String),
        }),
      ])
    );
  });
});
describe("GET /customers/:customerId", () => {
  it("should load a customer by name ", async () => {
    const response = await request(app).get("/customers/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        }),
      ])
    );
  });
});
describe("POST /customers", () => {
  it("should create new customer ", async () => {
    const customer = {
      name: "Appolin",
      address: "200 cyf G74 00",
      city: "Glasgow",
      country: "Scotland",
    };
    const response = await request(app).post("/customers").send(customer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        }),
      ])
    );
  });
});
describe("POST /products", () => {
  it("should create new product ", async () => {
    const product = {
      name: "Python book",
    };
    const response = await request(app).post("/products").send(product);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          product_name: expect.any(String),
        }),
      ])
    );
  });
});
describe("POST /availability", () => {
  it("should create new product availability", async () => {
    const productAvailability = {
      prodId: 12,
      suppId: 1,
      unitPrice: 70,
    };
    const response = await request(app)
      .post("/availability")
      .send(productAvailability);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          prod_id: expect.any(Number),
          supp_id: expect.any(Number),
          unit_price: expect.any(Number),
        }),
      ])
    );
  });
});
