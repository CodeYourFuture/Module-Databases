describe("POST /product-availability", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM orders WHERE id > 10;");
  });

  it("should to create a new order for a customer with an order date and reference number", async () => {
    const newOrder = {
      order_date: "2024-05-30",
      order_reference: "ORD011",
      customer_id: 5
    }
    const response = await request(server).post("/orders").send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newOrder,
      })
    );
  });
});