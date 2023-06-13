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

  it("should filter the list of products by name using a query parameter", async () => {
    const response = await request(app).get("/products?word=ball");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          name: expect.any(String),
          price: expect.any(Number),
          supplierName: expect.any(String),
        },
      ])
    );
  });
});

describe("GET /customers/:id", () => {
  it("should load a single customer by their ID", async () => {
    const response = await request(app).get("/customers/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        },
      ])
    );
  });
});

describe("POST /customer", () => {
  it("should create a new customer with name, address, city, and country", async () => {
    const newCustomer = {
      name: "Ama Test",
      address: "45 Another Fake Street",
      city: "London",
      country: "United Kingdom",
    };

    const response = await request(app).post("/customer").send(newCustomer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "New Customer added",
        customer: expect.objectContaining({
          name: newCustomer.name,
          address: newCustomer.address,
          city: newCustomer.city,
          country: newCustomer.country,
        }),
      })
    );
  });
});

describe("POST /products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      product_name: "Ball",
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "New product added",
        product: expect.objectContaining({
          product_name: newProduct.product_name,
        }),
      })
    );
  });
});

describe("POST /availability", () => {
  it("should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database", async () => {
    const newAvail = {
      prod_id: 2,
      supp_id: 4,
      unit_price: 249,
    };
    const response = await request(app).post("/availability").send(newAvail);
    if (response.status === 200) {
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "New product availability information added",
          productInfo: expect.objectContaining({
            prod_id: newAvail.prod_id,
            supp_id: newAvail.supp_id,
            unit_price: newAvail.unit_price,
          }),
        })
      );
    } else {
      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    }
  });
});

// describe("GET /products", () => {
//   it("should return a list of all product names with their prices and supplier names", async () => {
//     const response = await request(app).get("/products");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           name: expect.any(String),
//           price: expect.any(Number),
//           supplierName: expect.any(String),
//         }),
//       ])
//     );
//   });
