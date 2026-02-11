describe("GET /customers/:id", () => {
  it("should return a customer with the id 2", async () => {
    const response = await request(server).get("/customers/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        name: "Hope Crosby",
        address: "P.O. Box 276, 4976 Sit Rd.",
        city: "Steyr",
        country: "United Kingdom"
      })
    );
  });
});

describe("POST /customers", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM customers WHERE id > 6;");
  });

  it("should create a new customer with their name, address, city, and country.", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "Manchester",
      country: "United Kingdom"
    }
    const response = await request(server).post("/customers").send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newCustomer
      })
    );
  });
});

describe('PUT /customers', () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM customers WHERE id > 6;");
  });

  it('should update a customer with their name, address, city, and country.', async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "Manchester",
      country: "United Kingdom"
    }

    await request(server).post("/customers").send(newCustomer);
    const lastId = await global.dbClient.query("SELECT MAX(id) FROM customers");

    const updatedCustomer = {
      id: lastId.rows[0].max,
      name: "John Doe Junior",
      address: "321 Main St",
      city: "Salford",
      country: "United Kingdom"
    };

    const response = await request(server).put(`/customers/`).send(updatedCustomer);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...updatedCustomer
      })
    );
  });
});

describe('DELETE /customers', () => {
  it('should delete a customer given their id and if they do not have any orders.', async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      city: "Manchester",
      country: "United Kingdom"
    }
    await request(server).post("/customers").send(newCustomer);

    const lastId = (await global.dbClient.query("SELECT MAX(id) FROM customers")).rows[0].max;

    const customerToBeDeleted = {
      id: lastId
    }

    const response = await request(server).delete(`/customers`).send(customerToBeDeleted);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'customer deleted'
      })
    );
  });

  it('should return an error if the customer was not found.', async () => {
    const customerToBeDeleted = {
      id: 50
    }

    const response = await request(server).delete(`/customers`).send(customerToBeDeleted);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Customer not found."
      })
    );
  });

  it('should return an error if the customer has orders.', async () => {
    const customerToBeDeleted = {
      id: 1
    }

    const response = await request(server).delete(`/customers`).send(customerToBeDeleted);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Cannot delete customer with existing orders."
      })
    );
  })
});