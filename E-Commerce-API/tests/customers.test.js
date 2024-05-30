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
  it("should create a new customer with their name, address, city, and country.", async () => {
    const response = await request(server).post("/customers").send({
      name: "John Doe",
      address: "123 Main St",
      city: "Manchester",
      country: "UK"
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      {
        id: expect.any(Number),
        name: "John Doe",
        address: "123 Main St",
        city: "Manchester",
        country: "UK"
      }
    )
  });
});