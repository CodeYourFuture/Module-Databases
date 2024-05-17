import request from "supertest";
import app from "../app.js";


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

  it("should return product name search bt product name.", async () => {
    const response = await request(app).get("/products/le");
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

