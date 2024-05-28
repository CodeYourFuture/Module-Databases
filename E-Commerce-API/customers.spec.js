import request from "supertest";
import app from "../E-Commerce-API/app";

describe("GET /customers/:id", () => {
  it("should load a single customer by their ID", async () => {
    const customerId = 3;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body) === expect.any(Array);
    response.body.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
        })
      );
    });
  });
});

describe("post /customers", () => {
  it("should create a new customer with name, address, city, and country", async () => {
    const customerData = {
      name: "marcus",
      address: "solihull 12",
      city: "shirley",
      country: "UK",
    };
    const response = await request(app).post(`/customers`).send(customerData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "created a new customer was successfully !",
    });
  });
});
