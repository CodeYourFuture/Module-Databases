import request from "supertest";
import app from "../app";

describe("GET /products", () => {
  it("should return a list of all product ", async () => {
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
});

describe("GET /products/:name", () => {
  it("Should return product name, price and supplier based on specified product name", async () => {
    const testParam = "Mobile Phone X";
    const response = await request(app).get(`/products/${testParam}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_name: "Mobile Phone X",
          unit_price: expect.any(Number),
          supplier_name: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /products/:name", () => {
  it("should return product details for the specified name", async () => {
    const response = await request(app).get(`/products/`);
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

describe("post /products", () => {
  it("should create a new products", async () => {
    const newProduct = {
      product_name: "mobile iphone 12",
    };
    const response = await request(app).post(`/products`).send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "created a new product was successfully !",
    });
  });
});
