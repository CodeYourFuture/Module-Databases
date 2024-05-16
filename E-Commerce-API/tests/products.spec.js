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
          //Need to be asked how to get suppliername back with capital N
          suppliername: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /products?search=existenceItem and nonexistenceItem", () => {
  it("Should return a the item is searched by user", async () => {
    const response = await request(app).get("/products?search=Ball");
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
  it("should return an object with a message key and its content as value through 404", async () => {
    const response = await request(app).get(
      "/products?search=nonExistenceItem"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "No products found for the searched term.",
      })
    );
  });
});

describe("GET /customers/:customerId , should load a single customer by their ID.", () => {
  it("should resturn a specific customer with determined id", async () => {
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

  it("should return an object with a message if customer not found", async () => {
    const response = await request(app).get("/customers/-1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Customer with the id -1 not found!",
      })
    );
  });
});

//test to add a new customer to the db
describe("POST /customers", () => {
  it("Should add a new customer with name address city and ciuntry", async () => {
    const newCustomer = {
      name: "test Customer",
      address: "B00 0XX",
      city: "Birmingham",
      country: "United Kingdom",
    };
    const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Customer created successfully",
      })
    );
  });

  it("Should return an object with a message if body is not set correctly like empty string", async () => {
    //bad request with empty name
    const newCustomer = {
      name: "",
      address: "B00 0XX",
      city: "Birmingham",
      country: "United Kingdom",
    };
    const response = await request(app).post("/customers").send(newCustomer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        Error: "Bad Request! Name can not be empty",
      })
    );
  });
});

describe("POST /products", () => {
  it("Should create a new product and return a successful message if insertion was seccessful", async () => {
    const newProduct = {
      productName: "Laptop HP",
    };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "New product created successfully",
      })
    );
  });

  it("Should return a message shows insertion failed with incoorected values for the product or empty values", async () => {
    const badProduct = {
      productName: "",
    };
    const response = await request(app).post("/products").send(badProduct);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! This product can not be created!",
      })
    );
  });
});

//test collection for availability endpoint....
describe("POST availabilty", () => {
  it("Should return a successful messgae if a new product availabilty is done ", async () => {
    //This values are duplicate now so check for new one other wise test will fail
    const newProductAvalability = {
      prod_id: 3,
      suppId: 4,
      unitPrice: 111,
    };

    const response = await request(app)
      .post("/availability")
      .send(newProductAvalability);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "New product availability created successfully.",
      })
    );
  });

  it("Should return an error message if product id or supp id or price does not match requierments", async () => {
    // /product id is negative and doesnt exist in the DB
    const badProductAvailability = {
      prodId: -1,
      suppId: 2,
      unitPrice: 100,
    };

    const response = await request(app)
      .post("/availability")
      .send(badProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Product id does not exist in the DB",
      })
    );
  });

  it("Should return an error message if product id or supp id or price does not match requierments", async () => {
    //supplier id is negative
    const badProductAvailability = {
      prodId: 2,
      suppId: -2,
      unitPrice: 100,
    };

    const response = await request(app)
      .post("/availability")
      .send(badProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! supplier id does not exist in the DB",
      })
    );
  });

  it("Should return an error message if product id or supp id or price does not match requierments", async () => {
    const badProductAvailability = {
      prodId: 2,
      suppId: 2,
      unitPrice: -100,
    };

    const response = await request(app)
      .post("/availability")
      .send(badProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Price should be a pasitive integer value",
      })
    );
  });
  it("Should return an error message if product id or supp id or price does not match requierments", async () => {
    const badProductAvailability = {
      prodId: 2,
      suppId: 2,
      unitPrice: "string",
    };

    const response = await request(app)
      .post("/availability")
      .send(badProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Price should be a pasitive integer value",
      })
    );
  });

  it("Should return an error message if product id or supp id or price does not match requierments", async () => {
    // check for duplicate values
    const badProductAvailability = {
      prodId: 3,
      suppId: 3,
      unitPrice: 100,
    };

    const response = await request(app)
      .post("/availability")
      .send(badProductAvailability);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Duplicate values can not be inserted",
      })
    );
  });
});

//Test collections to add a new order for a specific customer
describe("POST /customers/:customerId/orders", () => {
  it("should return a success message if new order for existence customer completed", async () => {
    const newOrder = {
      orderDate: "2024-5-07",
      orderReference: "ORD011",
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "New order created successfully for customer",
      })
    );
  });
  it("should return an error maeesage if order date is null or empty or not in a valid format", async () => {
    const newOrder = {
      //order date is null
      orderDate: null,
      orderReference: "ORD011",
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error:
          "Bad request! Order date is not valid. check nullity or date format",
      })
    );
  });
  //check if date format is incorrect
  it("should return an error maeesage if order date is null or empty or not in a valid format", async () => {
    const newOrder = {
      //order date is null
      orderDate: "2024-13-20",
      orderReference: "ORD011",
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error:
          "Bad request! Order date is not valid. check nullity or date format",
      })
    );
  });

  it("should return an error maeesage if order date is null or empty or not in a valid format", async () => {
    const newOrder = {
      //order date is empty
      orderDate: "",
      orderReference: "ORD011",
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error:
          "Bad request! Order date is not valid. check nullity or date format",
      })
    );
  });

  it("should return an error maeesage if order reference is null or empty or not in a valid format", async () => {
    const newOrder = {
      orderDate: "2024-05-22",
      //order reference is empty
      orderReference: "",
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Order reference can not be null or empty",
      })
    );
  });

  //test if orderReference is not valid
  it("should return an error maeesage if order reference is null or empty or not in a valid format", async () => {
    const newOrder = {
      orderDate: "2024-05-22",
      orderReference: null,
      customer_id: 1,
    };
    const response = await request(app)
      .post("/customers/1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Order reference can not be null or empty",
      })
    );
  });
  //Test if customer doesn not exist
  it("should return an error maeesage if customer id does not exist in the DB ", async () => {
    const newOrder = {
      orderDate: "2024-05-22",
      orderReference: "ORD013",
      customer_id: -1,
    };
    const response = await request(app)
      .post("/customers/-1/orders")
      .send(newOrder);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! The customer does not exist",
      })
    );
  });
});

//Test collection to update an existence customer
describe("POST update /Customers/:customerId", () => {
  it("Should return a success message if customer details updated correctly", async () => {
    const updatedCustomer = {
      name: "Behrouz",
      address: "",
      city: "Birmingham",
      country: "United Kingdom",
    };

    const response = await request(app)
      .post("/customers/1")
      .send(updatedCustomer);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Customer updated successfully",
      })
    );
  });

  it("Should return an error message if customer does not exist in the DB", async () => {
    const updatedCustomer = {
      name: "Behrouz",
      address: "B00 0XY",
      city: "Birmingham",
      country: "United Kingdom",
    };

    const response = await request(app)
      .post("/customers/-1")
      .send(updatedCustomer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Customer does not exist in the DB",
      })
    );
  });

  it("Should return an error meesage for empty or null names", async () => {
    const updatedCustomer = {
      name: "",
      address: "",
      city: "Birmingham",
      country: "United Kingdom",
    };

    const response = await request(app)
      .post("/customers/1")
      .send(updatedCustomer);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! customer name can not be empty or null!",
      })
    );
  });
});

//test collection to delete an order
describe("DELETE /orders/:orderId", () => {
  it("Should return a success message of deletion for the associated order", async () => {
    const response = await request(app).delete("/orders/15");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "The order with all its items deleted successfully",
      })
    );
  });

  //return an error with a message if order could'not found
  it("Should return a success message of deletion for the associated order", async () => {
    const response = await request(app).delete("/orders/-1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Order did not find to be deleted",
      })
    );
  });

  it("Should return a success message of deletion for the associated order", async () => {
    const response = await request(app).delete("/orders/badFormat");
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Bad request! Order id format is not correct",
      })
    );
  });
});
