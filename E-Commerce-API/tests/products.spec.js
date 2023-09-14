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

describe("GET /products/:name", () => {
  it("should return a product with the given name", async () => {
    const response = await request(app).get("/products/testProduct");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "testProduct",
        price: expect.any(Number),
        supplierName: expect.any(String),
      })
    );
  });
});

describe("GET /customers/:id", () => {
  it("should return a customer with the given ID", async () => {
    const response = await request(app).get("/customers/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        address: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
      })
    );
  });
});

describe("POST /customers", () => {
  it("should create a new customer and return it", async () => {
    const newCustomer = {
      name: "Test Customer",
      address: "123 Test St",
      city: "Test City",
      country: "Test Country",
    };
    const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newCustomer));
  });
});

describe("POST /products", () => {
  it("should create a new product and return it", async () => {
    const newProduct = {
      name: "Test Product",
      price: 100,
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newProduct));
  });
});

describe("POST /availability", () => {
  it("should create a new product availability and return it", async () => {
    const newAvailability = {
      price: 100,
      productId: 1,
      supplierId: 1,
    };
    const response = await request(app)
      .post("/availability")
      .send(newAvailability);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newAvailability));
  });
});

describe("POST /orders", () => {
  it("should create a new order for a customer and return it", async () => {
    const newOrder = {
      customerId: 1,
      orderDate: "2022-01-01",
      reference: "Test Order",
    };
    const response = await request(app).post("/orders").send(newOrder);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newOrder));
  });
});

describe("PUT /customers/:id", () => {
  it("should update an existing customer's information and return it", async () => {
    const updatedCustomer = {
      name: "Updated Customer",
      address: "Updated Address",
      city: "Updated City",
      country: "Updated Country",
    };
    const response = await request(app)
      .put("/customers/1")
      .send(updatedCustomer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedCustomer));
  });
});

describe("DELETE /orders/:id", () => {
  it("should delete an existing order and all associated order items", async () => {
    const response = await request(app).delete("/orders/1");
    expect(response.status).toBe(204);
  });
});

describe("DELETE /customers/:id", () => {
  it("should delete an existing customer only if they do not have any orders", async () => {
    const response = await request(app).delete("/customers/1");
    expect(response.status).toBe(204);
  });
});

describe("GET /customers/:id/orders", () => {
  it("should return all orders with their items for a specific customer", async () => {
    const response = await request(app).get("/customers/1/orders");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          reference: expect.any(String),
          date: expect.any(String),
          products: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              price: expect.any(Number),
              supplierName: expect.any(String),
              quantity: expect.any(Number),
            }),
          ]),
        }),
      ])
    );
  });
});
