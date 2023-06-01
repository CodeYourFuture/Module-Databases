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

describe("GET/ products", () =>{
  it("should return a filtered list of products by name",  
  async () => {
    const responseWithParameter = await request(app).get("/products?name=");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
     expect.arrayContaining([
      expect.objectContaining([

      ])
     ])
    )
  })
})
