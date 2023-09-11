const request = require("supertest");
const app = require("../app");

describe("GET, POST /products", () => {
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
    const response = await request(app).get("/products/?name=coffee");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(/coffee|Coffee/),
          price: expect.any(Number),
          supplierName: expect.any(String),
        }),
      ])
    );
  });
  // it("should create a new product", async () => {
  //   const newProduct = {product_name: "Excel guidance book"};
  //   const response = await request(app).post("/products").send(newProduct);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       id: expect.any(Number),
  //       product_name: "Excel guidance book",
  //     })
  //   )
  // });
});

describe("GET, POST /customers/", () => {
  it("should load a single customer by their ID", async () => {
    const response = await request(app).get("/customers/4");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
          id: 4,
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
        })
    );
  });
  it("should load all the orders along with the items in the orders of a specific customer", async () => {
    const response = await request(app).get("/customers/3/orders");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          order_reference: expect.any(String),
          order_date: expect.any(String),
          product_name: expect.any(String),
          unit_price: expect.any(Number),
          supplier_name: expect.any(String),
          quantity: expect.any(Number),
        }),
      ])
    );
  });
  it("should create a new customer with name, address, city, and country", async () => {
    const newCustomer = {name: "Jonathan King",
  address: "29, Long Drive",
city: "Liverpool",
country: "United Kingdom"}
    const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "Jonathan King",
        address: "29, Long Drive",
        city: "Liverpool",
        country: "United Kingdom",
      })
    );
  });

  // it(
  //   "should create a new order for a customer, including an order date and order reference", async () => {
  //     const newOrder = {order_date: "2023-09-11",
  //   order_reference: "AAA546",
  // }
  //     const response = await request(app).post("/customers/5/orders").send(newOrder);
  //     expect(response.status).toEqual(201);
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         order_date: "2023-09-11",
  //         order_reference: "AAA546",
  //         customer_id: 5,
  //       })
  //     );
  //   }
  // );
  it(
    "An error should be returned if the customer ID doesn't correspond to an existing customer.", async () => {
      const newOrder = {order_date: "2023-09-11",
    order_reference: "AAA546",
  }
      const response = await request(app).post("/customers/95/orders").send(newOrder);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({error: "Customer with such ID not found"})
    }
  );
  it("should update an existing customer's information", async () => {
    const customer = {name: "Tom Reddle",
  address: "56, Park Avenue",
city: "New York",
country: "United States"}
    const response = await request(app).post("/customers/8").send(customer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 8,
        name: "Tom Reddle",
        address: "56, Park Avenue",
        city: "New York",
        country: "United States",
      })
    );
  });
  // it(
  //   "should delete an existing customer", async () => {
  //     const response = await request(app).delete("/customers/9");
  //     expect(response.status).toBe(204);
  //   }
  // );
  it(
    "should not delete an existing customer if the customer has any orders", async () => {
      const response = await request(app).delete("/customers/2");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: "Customer has existing orders and cannot be deleted.",
        })
      );
    }
  );
})

describe("POST /availability", () => {
  // it(
  //   "should create a new product availability with a price and supplier ID", async () => {
  //     const newProduct = {
  //       prod_id: 8,
  //       supp_id: 1,
  //       unit_price: 200,
  //     }
  //     const response = await request(app).post("/availability").send(newProduct);
  //     expect(response.status).toBe(201);
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         prod_id: 8,
  //         supp_id: 1,
  //         unit_price: 200,
  //       })
  //     )
  //   }
  // );
  it(
    "An error should be returned if the price is not a positive integer", async () => {
      const newProduct = {
        prod_id: 8,
        supp_id: 1,
        unit_price: -35,
      };
      const response = await request(app)
        .post("/availability")
        .send(newProduct);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({Error: "Price cannot be below 0"});
    }
  );
  it(
    "An error should be returned if either the product ID doesn't exist in the database", async () => {
      const newProduct = {
        prod_id: 25,
        supp_id: 1,
        unit_price: 200,
      };
      const response = await request(app)
        .post("/availability")
        .send(newProduct);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({Error: "Product with such ID does not exist"});
    }
  );
  it("An error should be returned if either the supplier ID doesn't exist in the database", async () => {
    const newProduct = {
      prod_id: 8,
      supp_id: 35,
      unit_price: 200,
    };
    const response = await request(app).post("/availability").send(newProduct);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({Error: "Supplier with such ID does not exist"});
  });
});