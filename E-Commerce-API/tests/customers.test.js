describe("GET /customers/:id", () => {
  it("should return a customer with the id 2", async () => {
    const response = await request(server).get("/customers/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        name: "Hope Crosby",
        address: "P.O. Box 276, 4976 Sit Rd.",
        city: "Steyr",
        country: "United Kingdom"
      })
    );
  });
});

describe("POST /customers", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM customers WHERE id > 6;");
  });

  it("should create a new customer with their name, address, city, and country.", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "Manchester",
      country: "United Kingdom"
    }
    const response = await request(server).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newCustomer
      })
    );
  });
});