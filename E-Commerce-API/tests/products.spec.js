const request = require("supertest");
const app = require("../app");
const { connectDB, disconnectDb } = require("../db");

let server;

beforeAll(async () => {
  await connectDB();
  server = app.listen(3100, () => {
    console.log("app is listening on port 3100");
  });
});

afterAll(() => {
  disconnectDb();
  server.close();
});

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
