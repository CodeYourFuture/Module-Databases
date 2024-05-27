const request = require("supertest");
const app = require("../app");
const { connectDB, disconnectDb } = require("../db");

let server;

beforeAll(async () => {
  await connectDB();
  server = app.listen(3100, () => {
    console.log("app is listening on port 3100");
  });
});

afterAll(() => {
  disconnectDb();
  server.close();
});

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

describe("GET /products?name=Mobile%20Phone%20X", () => {
  it("should filter the list of products by name using a query parameter", async () => {
    const response = await request(app).get("/products?name=Mobile%20Phone%20X");
    expect(response.status).toBe(200);
    //this is returning two objects with same product names
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Mobile Phone X",
          price: 249,
          supplierName: "Sainsburys",
        }),
      ])
    );
  });
});

describe("GET /customers/:customerId", () => {
  it("should load a single customer by their ID", async () => {
    const customer_id = 1;
    const response = await request(app).get(`/customers/${customer_id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        address: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
      })
    );
  });
});

describe("POST /customers", () => {
  it("should create a new customer", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Elm Street",
      city: "Anytown",
      country: "Anyland",
    };
    const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
  });
});

describe("POST /products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      product_name: "New Product",
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(201);
  });
});

describe("POST /availability", () => {
  it("should create a new product availability", async () => {
    const newAvailability = {
      unit_price: 199,
      prod_id: 19,
      supp_id: 20,
    };
    const response = await request(app).post("/availability").send(newAvailability);
    expect(response.status).toBe(201);
  });

  it("should return an error if the price is not a positive integer", async () => {
    const newAvailability = {
      unit_price: -199,
      prod_id: 0,
      supp_id: 0,
    };
    const response = await request(app).post("/availability").send(newAvailability);
    expect(response.status).toBe(400);
  });

  it("should return an error if the product or supplier IDs don't exist", async () => {
    const newAvailability = {
      unit_price: 199,
      prod_id: 9999,
      supp_id: 9999,
    };
    const response = await request(app).post("/availability").send(newAvailability);
    expect(response.status).toBe(400);
  });
});

describe("POST /customers/:customerId/orders", () => {
  it("should create a new order for a customer", async () => {
    const newOrder = {
      order_date: "2024-01-01",
      order_reference: "ORD123",
      customer_id: 0,
      product_id: 0,
      supplier_id: 0,
      quantity: 2,
    };
    const customer_id = 0;
    const response = await request(app).post(`/customers/${customer_id}/orders`).send(newOrder);
    expect(response.status).toBe(201);
  });

  it("should return an error if the customer ID doesn't exist", async () => {
    const newOrder = {
      order_date: "2024-01-01",
      order_reference: "ORD1234",
      customer_id: 9999,
      product_id: 0,
      supplier_id: 0,
      quantity: 2,
    };
    const customer_id = 999;
    const response = await request(app).post(`/customers/${customer_id}/orders`).send(newOrder);
    expect(response.status).toBe(400);
  });
});

describe("PATCH /customers/:customerId", () => {
  it("should update an existing customer's information", async () => {
    const updatedCustomer = {
      name: "Jane Doe",
      address: "456 Oak Street",
    };
    const customer_id = 0;
    const response = await request(app).patch(`/customers/${customer_id}`).send(updatedCustomer);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /orders/:orderId", () => {
  it("should delete an existing order and all associated order items", async () => {
    const order_id = 0;
    const response = await request(app).delete(`/orders/${order_id}`);
    expect(response.status).toBe(204);
  });
});

describe("DELETE /customers/:customerId", () => {
  it("should delete an existing customer only if the customer doesn't have any orders", async () => {
    const customer_id = 0;
    const response = await request(app).delete(`/customers/${customer_id}`);
    expect(response.status).toBe(204);
  });
});

describe("GET /customers/:customerId/orders", () => {
  it("should load all the orders along with the items in the orders of a specific customer", async () => {
    const customer_id = 0; // replace with a valid customer ID
    const response = await request(app).get(`/customers/${customer_id}/orders`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          order_reference: expect.any(String),
          order_date: expect.any(Date),
          items: expect.arrayContaining([
            expect.objectContaining({
              order_id: expect.any(Number),
              product_id: expect.any(Number),
              supplier_id: expect.any(Number),
              quantity: expect.any(Number),
            }),
          ]),
        }),
      ])
    );
  });
});
