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

describe("GET /products/:name", () => {
  it("should return a product with the name Ball", async () => {
    const response = await request(server).get("/products/Ball");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Ball',
          price: expect.any(Number),
          supplierName: expect.any(String),
        }),
      ])
    );
  });
});

describe("POST /products", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM products WHERE id > 7");
  });

  it("should add a new product to the list", async () => {
    const newProduct = {
      product_name: "New Product",
    };
    const response = await request(server).post("/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newProduct,
      })
    );
  });
});