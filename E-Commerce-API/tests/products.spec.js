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

it("should return a list of products matching the name query", async () => {
    const productName = "book";
    let response = await request(app).get(`/products?name=${productName}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          supplier_name: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /customers/:id", () => {
  it("should return the customer with the specified ID", async () => {
    const customerId = 4;
    const response = await request(app).get(`/customers/${customerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: customerId,
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        }),
      ])
    );
  });

  it("should return 500 if the customer ID is not a number", async () => {
    const nonExistentId = "lala";
    const response = await request(app).get(`/customers/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Internal Server Error",
      })
    );
  });

  it("should return 404 if the customer ID does not exist", async () => {
    const nonExistentId = 56;
    const response = await request(app).get(`/customers/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Customer does not exist",
      })
    );
  });
});

describe("POST /customers", () => {
  it("should create a new customer including name, address, city, country", async () => {
    const newCustomer = {
      name: "Lorena Capraru",
      address: "100 Princes Close",
      city: "London",
      country: "UK",
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

describe("POST /products", () => {
  it("should create a new product including product_name", async () => {
    const newProduct = {
      product_name: "Airpods",
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        product_name: newProduct.product_name,
      })
    );
  });
});

describe("POST /availability", () => {
  it("should return 400 if unit_price is not a number", async () => {
    const newProductAvailability = {
      prod_id: 1,
      supp_id: 2,
      unit_price: "test unit price",
    };
    const response = await request(app)
      .post("/availability")
      .send(newProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Price is not a positive integer",
      })
    );
  });


  it("should create a new product including prod_id, supp_id, unit_price", async () => {
    const newProductAvailability = {
      prod_id: 1,
      supp_id: 3,
      unit_price: 1995,
    };
    const response = await request(app)
      .post("/availability")
      .send(newProductAvailability);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        prod_id: newProductAvailability.prod_id,
        supp_id: newProductAvailability.supp_id,
        unit_price: newProductAvailability.unit_price,
      })
    );
  });
});

module.exports = app;