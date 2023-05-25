const request = require("supertest");
const app = require("../app");

describe("GET /customers/:id", () => {
  it("should return a single customer by their ID", async () => {
    const customerId = 1; // Replace with the desired customer ID

    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: customerId,
        // Include other properties you expect the customer to have
      })
    );
  });

  it("should return 404 if customer ID does not exist", async () => {
    const customerId = 999; // Replace with a non-existent customer ID

    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: `Customer with id ${customerId} not found`,
      })
    );
  });
});

describe("POST /customers", () => {
  it("should create a new customer with their name, address, city, and country", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      country: "United States",
    };

    const response = await request(app).post("/customers").send(newCustomer);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: newCustomer.name,
        address: newCustomer.address,
        city: newCustomer.city,
        country: newCustomer.country,
      })
    );
  });
});

describe("POST /orders", () => {
  it("should create a new order for a valid customer", async () => {
    const newOrder = {
      orderDate: "2023-05-25",
      referenceNumber: "ORD-001",
      customerId: 1,
    };

    const response = await request(app).post("/orders").send(newOrder);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        order_date: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        ),
        reference_number: newOrder.referenceNumber,
        customer_id: newOrder.customerId,
      })
    );
  });

  it("should return an error for an invalid customer ID", async () => {
    const newOrder = {
      orderDate: "2023-05-25",
      referenceNumber: "ORD-002",
      customerId: 999, // Invalid customer ID
    };

    const response = await request(app).post("/orders").send(newOrder);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Invalid customer ID",
    });
  });
});
