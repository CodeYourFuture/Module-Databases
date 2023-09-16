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
          suppliername: expect.any(String),
        }),
      ])
    );
  });
});
describe("GET /products/:name", () => {
  it("should return all product names with the matching name ", async () => {
    const response = await request(app).get("/products/super warm socks");
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
});
describe("GET /customers/:customerId", () => {
  it("should load a customer by name ", async () => {
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
});
describe("POST /customers", () => {
  it("should create new customer ", async () => {
    const customer = {
      name: "Appolin",
      address: "200 cyf G74 00",
      city: "Glasgow",
      country: "Scotland",
    };
    const response = await request(app).post("/customers").send(customer);
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
});
describe("POST /products", () => {
  it("should create new product ", async () => {
    const product = {
      name: "Python book",
    };
    const response = await request(app).post("/products").send(product);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          product_name: expect.any(String),
        }),
      ])
    );
  });
});
describe("POST /availability", () => {
  it("should create new product availability", async () => {
    const productAvailability = {
      prodId: 1,
      suppId: 3,
      unitPrice: 70,
    };
    const response = await request(app)
      .post("/availability")
      .send(productAvailability);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          prod_id: expect.any(Number),
          supp_id: expect.any(Number),
          unit_price: expect.any(Number),
        }),
      ])
    );
  });
});
describe("POST /customers/customerId/orders", () => {
  it("should create new order", async () => {
    const newOrder = {
      orderDate: new Date(),
      orderReference: "ORD0011",
      customerId: 2,
    };
    const response = await request(app)
      .post("/customers/2/orders")
      .send(newOrder);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          order_date: expect.any(String),
          order_reference: expect.any(String),
          customer_id: expect.any(Number),
        }),
      ])
    );
  });
});
describe("POST /customers/:customerId", () => {
  it("should update existing customer info ", async () => {
    const customer = {
      name: "Appolin",
      address: "500 cyf G72 00",
      city: "Glasgow",
      country: "Scotland",
    };
    const response = await request(app).post("/customers/13").send(customer);
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
});
describe("DELETE /orders/:orderId", () => {
  it("should delete existing order", async () => {
    const response = await request(app).delete("/orders/4");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        rowCount: expect.any(Number),
      })
    );
  });
});

describe("DELETE /customers/:customerId", () => {
  it("should delete existing customer without order", async () => {
    const response = await request(app).delete("/customers/6");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        rowCount: expect.any(Number),
      })
    );
  });
});
describe("GET /customers/customerId/orders", () => {
  it("should load orders from one customer", async () => {
    const response = await request(app).get("/customers/4/orders");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          order_reference: expect.any(String),
          order_date: expect.any(String),
          product_name: expect.any(String),
          supplier_name: expect.any(String),
          unit_price: expect.any(Number),
          quantity: expect.any(Number),
        }),
      ])
    );
  });
});
