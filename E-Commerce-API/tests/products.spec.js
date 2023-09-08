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

it("should return products matching the provided name", async () => {
  const nameToSearch = "book"; // Replace with a valid product name

  const response = await request(app)
    .get("/products")
    .query({ name: nameToSearch });

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThan(0);

  // Check if each item in the response contains the provided name
  for (const product of response.body) {
    expect(product).toHaveProperty("name", nameToSearch);
  }
});

// As a user, I want to view a single customer by their ID.
describe("GET /customers/:id", () => {
  it("should return a single customer by their ID", async () => {
    const customerId = 1; // Replace with a valid customer ID

    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", customerId);
    expect(response.body).toHaveProperty("name");
  });

  it("should return 404 for a non-existent customer", async () => {
    const customerId = 999; // Use an ID that does not exist

    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Customer not found");
  });

  it("should return 400 for an invalid customer ID", async () => {
    const customerId = "invalid"; // Use an invalid ID

    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid customer ID");
  });
});

describe("POST /customers", () => {
  it("should create a new customer with name, address, city, and country", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "USA",
    };

    const response = await request(app).post("/customers").send(newCustomer);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newCustomer.name);
    expect(response.body).toHaveProperty("address", newCustomer.address);
    expect(response.body).toHaveProperty("city", newCustomer.city);
    expect(response.body).toHaveProperty("country", newCustomer.country);
  });

  it("should return 400 for incomplete customer data", async () => {
    const incompleteCustomer = {
      name: "Jane Smith",
      // Missing 'address', 'city', and 'country' fields
    };

    const response = await request(app)
      .post("/customers")
      .send(incompleteCustomer);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Incomplete customer data");
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

// Endpoint `/availability` should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database.
describe("POST /availability", () => {
  it("should create a new product availability", async () => {
    const newAvailability = {
      productId: 1, // Replace with a valid product ID
      supplierId: 1, // Replace with a valid supplier ID
      price: 19.99,
    };

    const response = await request(app)
      .post("/availability")
      .send(newAvailability);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "productId",
      newAvailability.productId
    );
    expect(response.body).toHaveProperty(
      "supplierId",
      newAvailability.supplierId
    );
    expect(response.body).toHaveProperty("price", newAvailability.price);
  });

  it("should return 400 for incomplete availability data", async () => {
    const incompleteAvailability = {
      productId: 1, // Replace with a valid product ID
      // Missing 'supplierId' and 'price' fields
    };

    const response = await request(app)
      .post("/availability")
      .send(incompleteAvailability);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Incomplete availability data"
    );
  });

  it("should return 400 for invalid product or supplier ID", async () => {
    const invalidAvailability = {
      productId: 999, // Use an invalid product ID
      supplierId: 999, // Use an invalid supplier ID
      price: 19.99,
    };

    const response = await request(app)
      .post("/availability")
      .send(invalidAvailability);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid product or supplier ID"
    );
  });

  it("should return 400 for non-positive price", async () => {
    const nonPositivePrice = {
      productId: 1, // Replace with a valid product ID
      supplierId: 1, // Replace with a valid supplier ID
      price: -10, // Negative price
    };

    const response = await request(app)
      .post("/availability")
      .send(nonPositivePrice);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Price must be a positive number"
    );
  });
});

// As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid
// As a user, I want to create a new order for a customer.
describe("POST /customers/:customerId/orders", () => {
  it("should create a new order for a customer", async () => {
    const customer = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "USA",
    };
    // Create a new customer to get the customer ID
    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(customer);
    const customerId = createCustomerResponse.body.id;

    const newOrder = {
      orderDate: "2023-08-30", // Replace with a valid date
      referenceNumber: "ORD12345", // Replace with a valid reference number
    };

    const response = await request(app)
      .post(`/customers/${customerId}/orders`)
      .send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("customerId", customerId);
    expect(response.body).toHaveProperty("orderDate", newOrder.orderDate);
    expect(response.body).toHaveProperty(
      "referenceNumber",
      newOrder.referenceNumber
    );
  });

  it("should return 400 for an invalid customer ID", async () => {
    const invalidCustomerId = 999; // Use an invalid customer ID
    const newOrder = {
      orderDate: "2023-08-30", // Replace with a valid date
      referenceNumber: "ORD12345", // Replace with a valid reference number
    };

    const response = await request(app)
      .post(`/customers/${invalidCustomerId}/orders`)
      .send(newOrder);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid customer ID");
  });
});

// As a user, I want to update an existing customer's information with their name, address, city, and country.
const request = require("supertest");
const app = require("../app");

describe("PUT /customers/:id", () => {
  it("should update an existing customer's information", async () => {
    // Create a new customer
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "USA",
    };

    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(newCustomer);

    const customerId = createCustomerResponse.body.id;

    // Update the customer's information
    const updatedCustomerData = {
      name: "Updated Name",
      address: "456 Elm St",
      city: "Los Angeles",
      country: "USA",
    };

    const updateCustomerResponse = await request(app)
      .put(`/customers/${customerId}`)
      .send(updatedCustomerData);

    expect(updateCustomerResponse.status).toBe(200);
    expect(updateCustomerResponse.body).toHaveProperty("id", customerId);
    expect(updateCustomerResponse.body).toHaveProperty(
      "name",
      updatedCustomerData.name
    );
    expect(updateCustomerResponse.body).toHaveProperty(
      "address",
      updatedCustomerData.address
    );
    expect(updateCustomerResponse.body).toHaveProperty(
      "city",
      updatedCustomerData.city
    );
    expect(updateCustomerResponse.body).toHaveProperty(
      "country",
      updatedCustomerData.country
    );
  });

  it("should return 404 for updating a non-existent customer", async () => {
    const nonExistentCustomerId = 999; // Use an ID that does not exist

    const updatedCustomerData = {
      name: "Updated Name",
      address: "456 Elm St",
      city: "Los Angeles",
      country: "USA",
    };

    const response = await request(app)
      .put(`/customers/${nonExistentCustomerId}`)
      .send(updatedCustomerData);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Customer not found");
  });

  it("should return 400 for updating with invalid customer ID", async () => {
    const invalidCustomerId = "invalid"; // Use an invalid ID

    const updatedCustomerData = {
      name: "Updated Name",
      address: "456 Elm St",
      city: "Los Angeles",
      country: "USA",
    };

    const response = await request(app)
      .put(`/customers/${invalidCustomerId}`)
      .send(updatedCustomerData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid customer ID");
  });

  it("should return 400 for incomplete customer data", async () => {
    const customer = {
      name: "Jane Smith",
      address: "123 Oak St",
      city: "Chicago",
      country: "USA",
    };

    // Create a new customer
    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(customer);

    const customerId = createCustomerResponse.body.id;

    // Attempt to update with incomplete customer data
    const incompleteCustomerData = {
      // Missing 'name' field
      address: "Updated Address",
      city: "Updated City",
      country: "Updated Country",
    };

    const response = await request(app)
      .put(`/customers/${customerId}`)
      .send(incompleteCustomerData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Incomplete customer data");
  });
});

// As a user, I want to delete an existing order and all associated order items.
describe("DELETE /orders/:orderId", () => {
  it("should delete an existing order and associated order items", async () => {
    // Create a new order to be deleted
    const newOrder = {
      customerId: 1, // Replace with a valid customer ID
      orderDate: "2023-09-04",
      referenceNumber: "ORD123",
    };

    const createOrderResponse = await request(app)
      .post(`/customers/${newOrder.customerId}/orders`)
      .send(newOrder);

    const orderId = createOrderResponse.body.id;

    // Create an associated order item (if needed) - Adjust as per your data structure

    // Now, attempt to delete the order and associated items
    const deleteOrderResponse = await request(app).delete(`/orders/${orderId}`);

    // Check the response
    expect(deleteOrderResponse.status).toBe(204); // 204 indicates successful deletion
  });

  it("should return 404 for deleting a non-existent order", async () => {
    const nonExistentOrderId = 999; // Use an ID that does not exist

    const deleteOrderResponse = await request(app).delete(
      `/orders/${nonExistentOrderId}`
    );

    expect(deleteOrderResponse.status).toBe(404);
    expect(deleteOrderResponse.body).toHaveProperty("error", "Order not found");
  });

  it("should return 400 for deleting with an invalid order ID", async () => {
    const invalidOrderId = "invalid"; // Use an invalid ID

    const deleteOrderResponse = await request(app).delete(
      `/orders/${invalidOrderId}`
    );

    expect(deleteOrderResponse.status).toBe(400);
    expect(deleteOrderResponse.body).toHaveProperty(
      "error",
      "Invalid order ID"
    );
  });
});

// As a user, I want to delete an existing customer only if they do not have any orders.
// As a user, I want to delete an existing customer only if they do not have any orders.
describe("DELETE /customers/:id", () => {
  it("should delete an existing customer without orders", async () => {
    // Create a new customer
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "USA",
    };

    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(newCustomer);

    const customerId = createCustomerResponse.body.id;

    // Attempt to delete the customer without any orders
    const deleteCustomerResponse = await request(app).delete(
      `/customers/${customerId}`
    );

    expect(deleteCustomerResponse.status).toBe(204); // 204 indicates successful deletion
  });

  it("should return 400 for deleting a customer with orders", async () => {
    // Create a new customer with an associated order
    const newCustomer = {
      name: "Jane Smith",
      address: "456 Elm St",
      city: "Los Angeles",
      country: "USA",
    };

    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(newCustomer);

    const customerId = createCustomerResponse.body.id;

    // Create a new order for the customer
    const newOrder = {
      orderDate: "2023-08-30",
      referenceNumber: "ORD12345",
    };

    const createOrderResponse = await request(app)
      .post(`/customers/${customerId}/orders`)
      .send(newOrder);

    // Attempt to delete the customer with orders
    const deleteCustomerResponse = await request(app).delete(
      `/customers/${customerId}`
    );

    expect(deleteCustomerResponse.status).toBe(400);
    expect(deleteCustomerResponse.body).toHaveProperty(
      "error",
      "Customer has existing orders and cannot be deleted"
    );
  });

  it("should return 404 for deleting a non-existent customer", async () => {
    const nonExistentCustomerId = 999; // Use an ID that does not exist

    const deleteCustomerResponse = await request(app).delete(
      `/customers/${nonExistentCustomerId}`
    );

    expect(deleteCustomerResponse.status).toBe(404);
    expect(deleteCustomerResponse.body).toHaveProperty(
      "error",
      "Customer not found"
    );
  });

  it("should return 400 for deleting with an invalid customer ID", async () => {
    const invalidCustomerId = "invalid"; // Use an invalid ID

    const deleteCustomerResponse = await request(app).delete(
      `/customers/${invalidCustomerId}`
    );

    expect(deleteCustomerResponse.status).toBe(400);
    expect(deleteCustomerResponse.body).toHaveProperty(
      "error",
      "Invalid customer ID"
    );
  });
});

// As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.
describe("GET /customers/:customerId/orders", () => {
  it("should return all orders with items for a specific customer", async () => {
    // Create a new customer
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      country: "USA",
    };

    const createCustomerResponse = await request(app)
      .post("/customers")
      .send(newCustomer);

    const customerId = createCustomerResponse.body.id;

    // Create a new order for the customer
    const newOrder = {
      orderDate: "2023-08-30",
      referenceNumber: "ORD12345",
    };

    const createOrderResponse = await request(app)
      .post(`/customers/${customerId}/orders`)
      .send(newOrder);

    const orderId = createOrderResponse.body.id;

    // Create a new product
    const newProduct = {
      name: "New Product",
      price: 19.99,
      supplierName: "Supplier XYZ",
    };

    const createProductResponse = await request(app)
      .post("/products")
      .send(newProduct);

    const productId = createProductResponse.body.id;

    // Add the product to the order with quantity
    const orderItem = {
      productId: productId,
      quantity: 5,
    };

    const createOrderItemResponse = await request(app)
      .post(`/orders/${orderId}/items`)
      .send(orderItem);

    // Get all orders with items for the specific customer
    const response = await request(app).get(`/customers/${customerId}/orders`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Check if each order contains the expected properties
    for (const order of response.body) {
      expect(order).toHaveProperty("orderId");
      expect(order).toHaveProperty("orderDate", newOrder.orderDate);
      expect(order).toHaveProperty("referenceNumber", newOrder.referenceNumber);
      expect(Array.isArray(order.items)).toBe(true);
      expect(order.items.length).toBeGreaterThan(0);

      // Check if each order item contains the expected properties
      for (const item of order.items) {
        expect(item).toHaveProperty("productId", productId);
        expect(item).toHaveProperty("quantity", orderItem.quantity);
        expect(item).toHaveProperty("productName", newProduct.name);
        expect(item).toHaveProperty("unitPrice", newProduct.price);
        expect(item).toHaveProperty("supplierName", newProduct.supplierName);
      }
    }
  });

  it("should return 400 for an invalid customer ID", async () => {
    const invalidCustomerId = 999; // Use an invalid customer ID

    const response = await request(app).get(
      `/customers/${invalidCustomerId}/orders`
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid customer ID");
  });
});
