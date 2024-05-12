const request = require("supertest");
const app = require("../app");

describe("GET /products", () => {
  it("should return a list of all product ", async () => {
    const product = "Javascript Book";
    const response = await request(app).get(`/products ${product}`);
    expect(response.status).toBe(200);
    expect(response.body) ===
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          supplierName: expect.any(String),
        }),
      ]);
  });
});

describe("GET /products/:name", () => {
  it("should return product details for the specified name", async () => {
    const productName = [
      {
        id: 1,
        name: "karam",
        address: "770-2839 Ligula Road",
        city: "Birmingham",
        country: "UK",
      },
      {
        id: 2,
        name: "marcus",
        address: "770-2839 Ligula new",
        city: "Birmingham",
        country: "UK",
      },
    ];
    const response = await request(app).get(`/products/ ${productName}`);
    expect(response.status).toBe(200);
    expect(response.body) === expect.any(Array);
    response.body.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          product_name: expect.any(String),
        })
      );
    });
  });
});

describe("GET /customers/:id", () => {
  it("should load a single customer by their ID", async () => {
    const customerId = 3;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body) === expect.any(Array);
    response.body.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          customer_id: expect.any(Number),
        })
      );
    });
  });
});
