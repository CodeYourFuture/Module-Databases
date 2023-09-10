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

describe("GET /products/?name=Mobile", () => {
  it("I want to search for product by name", async () => {
    const response = await request(app).get("/products/?name=Mobile");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
        })
      ])
    );
  });
});

describe("GET /customers/:customerId", () => {
  it(`should load a single customer by their ID`, async () => {
    const customerId = 1;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
    );
  });
});

// describe("POST /customers/newCustomer", () => {
//   it("should create a new customer with name, address, city, and country", async () => {
//     const newCustomer = {
//       name: "Test TDD",
//       address: "123 Cyf St",
//       city: "Sample City",
//       country: "Sample Country",
//     };
//     const response = await request(app)
//       .post(`/customers/newCustomer`)
//       .send(newCustomer);
//     expect(response.status).toBe(201);
//     expect(response.body.name).toBeString();
//     expect(response.body.name).not.toBeEmpty();
//     expect(response.body.address).toBeString();
//     expect(response.body.address).not.toBeEmpty();
//     expect(response.body.city).toBeString();
//     expect(response.body.city).not.toBeEmpty();
//     expect(response.body.country).toBeString();
//     expect(response.body.country).not.toBeEmpty();
//     expect(response.body).toEqual(
//         expect.objectContaining({
//           name: expect.any(String),
//           address: expect.any(String),
//           city: expect.any(String),
//           country: expect.any(String),
//         }),
//     );
//   });
// });