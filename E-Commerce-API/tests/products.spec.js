const request = require("supertest");
const { end } = require("../db");
process.env.NODE_ENV = "test";
process.env.PORT = 3001;
const server = require("../app");

describe("GET /products", () => {
  it("should return a list of all product names with their prices and supplier names", async () => {
    const response = await request(server).get("/products");
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

afterAll(async () => {
  await end(); // Disconnect from the database
  await server.close(); // Close the server if using a separate server instance
});