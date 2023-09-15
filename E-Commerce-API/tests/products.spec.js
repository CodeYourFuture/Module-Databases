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

// it("should return products matching the provided name", async () => {
//   const nameToSearch = "book"; // Replace with a valid product name

//   const response = await request(app)
//     .get("/products")
//     .query({ name: nameToSearch });

//   expect(response.status).toBe(200);
//   expect(Array.isArray(response.body)).toBe(true);
//   expect(response.body.length).toBeGreaterThan(0);

//   // Check if each item in the response contains the provided name
//   for (const product of response.body) {
//     expect(product).toHaveProperty("name", nameToSearch);
//   }
// });

describe("GET /products/search", () => {
  it("should return a list of products that match the search query", async () => {
    // Define a test search query (replace with a valid query)
    const searchQuery = "Product Name";

    // Send a GET request to the /products/search endpoint with the search query
    const response = await request(app)
      .get("/products/search")
      .query({ name: searchQuery });

    // Check the response status code
    expect(response.status).toBe(200);

    // Check the response body structure
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

  it("should return a 400 status code for an invalid search query", async () => {
    // Send a GET request to the /products/search endpoint with an empty search query
    const response = await request(app)
      .get("/products/search")
      .query({ name: "" });

    // Check the response status code for a bad request
    expect(response.status).toBe(400);

    // Check the response body for the error message
    expect(response.body).toEqual({
      error: "Invalid search query, please provide a product name",
    });
  });

  it("should return a 500 status code for database query errors", async () => {
    // Mock a database query error by providing an invalid database connection string
    // This will simulate a database error in the code
    const appWithInvalidDB = require("../appWithInvalidDB");

    // Send a GET request to the /products/search endpoint with a valid search query
    const response = await request(appWithInvalidDB)
      .get("/products/search")
      .query({ name: "Product Name" });

    // Check the response status code for a server error
    expect(response.status).toBe(500);

    // Check the response body for the error message
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

// As a user, I want to view a single customer by their ID.
describe("GET /customers/:id", () => {
  // Create a customer object to use in the test
  const customer = {
    id: 1,
    name: "Test Customer",
    address: "123 Test Street",
    city: "Test City",
    country: "Test Country",
  };

  beforeAll(async () => {
    // Insert the test customer into the database before running the tests
    const client = await pool.connect();
    await client.query(
      "INSERT INTO customers (id, name, address, city, country) VALUES ($1, $2, $3, $4, $5)",
      [
        customer.id,
        customer.name,
        customer.address,
        customer.city,
        customer.country,
      ]
    );
    client.release();
  });

  afterAll(async () => {
    // Remove the test customer from the database after running the tests
    const client = await pool.connect();
    await client.query("DELETE FROM customers WHERE id = $1", [customer.id]);
    client.release();
  });

  it("should return a single customer by their ID", async () => {
    const response = await request(app).get(`/customers/${customer.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(customer);
  });

  it("should return a 404 error for a non-existing customer", async () => {
    const nonExistentCustomerId = 999; // Assuming this ID does not exist in the database
    const response = await request(app).get(
      `/customers/${nonExistentCustomerId}`
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Customer not found" });
  });
});

describe("POST /customers", () => {
  it("should create a new customer with name, address, city, and country", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      country: "USA",
    };

    const response = await request(app).post("/customers").send(newCustomer);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newCustomer);
  });

  it("should return a 400 error if required fields are missing", async () => {
    const invalidCustomer = {
      name: "Jane Smith",
      // Missing address, city, and country
    };

    const response = await request(app)
      .post("/customers")
      .send(invalidCustomer);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

// As a user, I want to create a new product.
describe("POST /products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "New Product",
      price: 19.99,
      supplierName: "Supplier XYZ",
    };

    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newProduct.name);
    expect(response.body).toHaveProperty("price", newProduct.price);
    expect(response.body).toHaveProperty(
      "supplierName",
      newProduct.supplierName
    );
  });

  it("should return 400 for incomplete product data", async () => {
    const incompleteProduct = {
      name: "Incomplete Product",
      // Missing 'price' and 'supplierName' fields
    };

    const response = await request(app)
      .post("/products")
      .send(incompleteProduct);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Incomplete product data");
  });
});

// As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
describe("POST /product-availability", () => {
  afterAll(async () => {
    // Close the database connection pool after all tests
    await pool.end();
  });

  it("should create a new product availability", async () => {
    const product = {
      prod_id: 1, // Replace with an existing product ID from your database
      supp_id: 1, // Replace with an existing supplier ID from your database
      unit_price: 50, // A positive integer
    };

    const response = await request(app)
      .post("/product-availability")
      .send(product);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("prod_id", product.prod_id);
    expect(response.body).toHaveProperty("supp_id", product.supp_id);
    expect(response.body).toHaveProperty("unit_price", product.unit_price);
  });

  it("should return an error for an invalid unit price", async () => {
    const product = {
      prod_id: 1, // Replace with an existing product ID from your database
      supp_id: 1, // Replace with an existing supplier ID from your database
      unit_price: -10, // Negative unit price (invalid)
    };

    const response = await request(app)
      .post("/product-availability")
      .send(product);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("Invalid unit price");
  });

  it("should return an error for non-existing product ID", async () => {
    const product = {
      prod_id: 999, // Non-existing product ID
      supp_id: 1, // Replace with an existing supplier ID from your database
      unit_price: 50,
    };

    const response = await request(app)
      .post("/product-availability")
      .send(product);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("Product not found");
  });

  it("should return an error for non-existing supplier ID", async () => {
    const product = {
      prod_id: 1, // Replace with an existing product ID from your database
      supp_id: 999, // Non-existing supplier ID
      unit_price: 50,
    };

    const response = await request(app)
      .post("/product-availability")
      .send(product);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("Supplier not found");
  });
});

// As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid
describe("POST /orders", () => {
  it("should create a new order for a valid customer", async () => {
    // Replace these variables with actual data
    const validCustomerId = 1; // ID of an existing customer
    const orderData = {
      order_date: "2023-09-13", // Replace with a valid date
      order_reference: "ORD123", // Replace with a unique reference
      customer_id: validCustomerId,
    };

    const response = await request(app).post("/orders").send(orderData);

    expect(response.status).toBe(201); // Assuming you return 201 for successful creation
    expect(response.body).toHaveProperty("id"); // Assuming the response includes the ID of the created order
  });

  it("should return an error for an invalid customer ID", async () => {
    // Replace this variable with a non-existent customer ID
    const invalidCustomerId = 9999;

    const orderData = {
      order_date: "2023-09-13", // Replace with a valid date
      order_reference: "ORD123", // Replace with a unique reference
      customer_id: invalidCustomerId,
    };

    const response = await request(app).post("/orders").send(orderData);

    expect(response.status).toBe(400); // Assuming you return 400 for validation error
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid customer ID");
  });
});

// As a user, I want to update an existing customer's information with their name, address, city, and country.
describe("POST /orders", () => {
  it("should create a new order for a valid customer", async () => {
    // Replace these variables with actual data
    const validCustomerId = 1; // ID of an existing customer
    const orderData = {
      order_date: "2023-09-13", // Replace with a valid date
      order_reference: "ORD123", // Replace with a unique reference
      customer_id: validCustomerId,
    };

    const response = await request(app).post("/orders").send(orderData);

    expect(response.status).toBe(201); // Assuming you return 201 for successful creation
    expect(response.body).toHaveProperty("id"); // Assuming the response includes the ID of the created order
  });

  it("should return an error for an invalid customer ID", async () => {
    // Replace this variable with a non-existent customer ID
    const invalidCustomerId = 9999;

    const orderData = {
      order_date: "2023-09-13", // Replace with a valid date
      order_reference: "ORD123", // Replace with a unique reference
      customer_id: invalidCustomerId,
    };

    const response = await request(app).post("/orders").send(orderData);

    expect(response.status).toBe(400); // Assuming you return 400 for validation error
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid customer ID");
  });
});

// As a user, I want to update an existing customer's information with their name, address, city, and country.
describe("PUT /customers/:id", () => {
  it("should update an existing customer's information", async () => {
    const customerIdToUpdate = 1; // Replace with the ID of the customer you want to update
    const updatedCustomerData = {
      name: "New Name",
      address: "New Address",
      city: "New City",
      country: "New Country",
    };

    const response = await request(app)
      .put(`/customers/${customerIdToUpdate}`)
      .send(updatedCustomerData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Customer updated successfully" });
  });

  it("should return an error if the customer ID is invalid", async () => {
    const invalidCustomerId = 9999; // Replace with an invalid customer ID

    const response = await request(app)
      .put(`/customers/${invalidCustomerId}`)
      .send({
        name: "New Name",
        address: "New Address",
        city: "New City",
        country: "New Country",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Customer not found" });
  });
});

// As a user, I want to delete an existing order and all associated order items.
describe("DELETE /customers/:customerId", () => {
  it("should delete a customer if the customer doesn't have any orders", async () => {
    // Create a new customer with no associated orders
    const createResponse = await request(app).post("/customers").send({
      name: "Test Customer",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country",
    });

    expect(createResponse.status).toBe(201);

    const customerId = createResponse.body.id;

    // Delete the customer
    const deleteResponse = await request(app).delete(
      `/customers/${customerId}`
    );

    expect(deleteResponse.status).toBe(204);

    // Verify that the customer was deleted
    const verifyResponse = await request(app).get(`/customers/${customerId}`);

    expect(verifyResponse.status).toBe(404);
  });

  it("should not delete a customer if the customer has associated orders", async () => {
    // Create a new customer with associated orders
    const createResponse = await request(app).post("/customers").send({
      name: "Customer With Orders",
      address: "456 Orders Avenue",
      city: "Ordersville",
      country: "Orderland",
    });

    expect(createResponse.status).toBe(201);

    const customerId = createResponse.body.id;

    // Create an order associated with the customer
    const createOrderResponse = await request(app).post("/orders").send({
      order_date: "2023-09-15",
      order_reference: "ORD123",
      customer_id: customerId,
    });

    expect(createOrderResponse.status).toBe(201);

    // Attempt to delete the customer
    const deleteResponse = await request(app).delete(
      `/customers/${customerId}`
    );

    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body.error).toBe(
      "Customer has associated orders and cannot be deleted."
    );
  });
});

// As a user, I want to delete an existing customer only if they do not have any orders.
describe("DELETE /customers/:customerId", () => {
  it("should delete an existing customer only if they have no orders", async () => {
    // First, create a new customer without any orders
    const customerResponse = await request(app).post("/customers").send({
      name: "Test Customer",
      address: "123 Test St",
      city: "Testville",
      country: "Testland",
    });

    expect(customerResponse.status).toBe(201);
    const customer = customerResponse.body;

    // Attempt to delete the customer
    const deleteResponse = await request(app).delete(
      `/customers/${customer.id}`
    );

    // Check if the customer was deleted successfully
    expect(deleteResponse.status).toBe(204);
  });

  it("should not delete a customer with associated orders", async () => {
    // Create a new customer with associated orders
    const customerResponse = await request(app).post("/customers").send({
      name: "Customer With Orders",
      address: "456 Orders Ln",
      city: "Orderstown",
      country: "Orderland",
    });

    expect(customerResponse.status).toBe(201);
    const customer = customerResponse.body;

    // Create an order associated with the customer
    const orderResponse = await request(app).post("/orders").send({
      order_date: "2023-01-01",
      order_reference: "ORDER123",
      customer_id: customer.id,
    });

    expect(orderResponse.status).toBe(201);

    // Attempt to delete the customer
    const deleteResponse = await request(app).delete(
      `/customers/${customer.id}`
    );

    // Check if the customer was not deleted due to associated orders
    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body.error).toBe(
      "Customer has associated orders and cannot be deleted."
    );
  });
});

// As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.
describe("GET /customers/:customerId/orders", () => {
  it("should return all orders with items for a specific customer", async () => {
    const customerId = 1; // Replace with the ID of the specific customer you want to test

    const response = await request(app).get(`/customers/${customerId}/orders`);
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

  it("should return a 404 status if the customer does not exist", async () => {
    const nonExistentCustomerId = 999; // Replace with a non-existent customer ID

    const response = await request(app).get(
      `/customers/${nonExistentCustomerId}/orders`
    );
    expect(response.status).toBe(404);
  });
});
