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
          //Need to be asked how to get suppliername back with capital N
          suppliername: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /products?search=existenceItem and nonexistenceItem", () => {
  it("Should return a the item is searched by user", async () => {
    const response = await request(app).get("/products?search=Ball");
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
  it("should return an object with a message key and its content as value through 404", async () => {
    const response = await request(app).get(
      "/products?search=nonExistenceItem"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "No products found for the searched term.",
      })
    );
  });
});

describe("GET /customers/:customerId , should load a single customer by their ID.", () => {
  it("should resturn a specific customer with determined id", async () => {
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

  it("should return an object with a message if customer not found", async () => {
    const response = await request(app).get("/customers/-1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Customer with the id -1 not found!",
      })
    );
  });
});
