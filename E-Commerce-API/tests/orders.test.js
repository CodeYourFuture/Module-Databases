describe("POST /product-availability", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM orders WHERE id > 10;");
  });

  it("should to create a new order for a customer with an order date and reference number", async () => {
    const newOrder = {
      order_date: "2024-05-30",
      order_reference: "ORD011",
      customer_id: 5
    }
    const response = await request(server).post("/orders").send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newOrder,
      })
    );
  });

  it("should return an error if the order date or order reference are not provided", async () => {
    const newOrder = {
      order_date: "",
      order_reference: "",
      customer_id: 5
    }
    const response = await request(server).post("/orders").send(newOrder);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "order_date and order_reference are required"
      })
    )
  });
});

describe("DELETE /orders", () => {
  it("should delete an order and all order items", async () => {
    await global.dbClient.query(`
      INSERT INTO orders (order_date, order_reference, customer_id)
        VALUES ('2024-05-31', 'ORD012', 4)
        RETURNING *;
    `);
    const lastOrderId = (await global.dbClient.query("SELECT MAX(id) FROM orders;")).rows[0].max;

    await global.dbClient.query(`
      INSERT INTO order_items (order_id, product_id, supplier_id, quantity)
        VALUES
          (${lastOrderId}, 1, 1, 2),
          (${lastOrderId}, 2, 1, 3),
          (${lastOrderId}, 3, 1, 1)
          RETURNING *;
    `);

    const orderToBeDeleted = {
      order_id: lastOrderId
    };

    const response = await request(server).delete("/orders").send(orderToBeDeleted);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Order deleted successfully"
      })
    );
  });

  it("should return an error if the order does not exist", async () => {
    await global.dbClient.query(`
      INSERT INTO orders (order_date, order_reference, customer_id)
        VALUES ('2024-05-31', 'ORD012', 4)
        RETURNING *;
    `);
    const lastOrderId = (await global.dbClient.query("SELECT MAX(id) FROM orders;")).rows[0].max;

    await global.dbClient.query(`
      INSERT INTO order_items (order_id, product_id, supplier_id, quantity)
        VALUES
          (${lastOrderId}, 1, 1, 2),
          (${lastOrderId}, 2, 1, 3),
          (${lastOrderId}, 3, 1, 1)
          RETURNING *;
    `);

    const orderToBeDeleted = {
      order_id: lastOrderId + 10
    };

    const response = await request(server).delete("/orders").send(orderToBeDeleted);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: `Order not found`
      })
    );

    await global.dbClient.query(`
    DELETE FROM order_items
        WHERE order_id = ${lastOrderId};
        DELETE FROM orders
        WHERE id = ${lastOrderId};
    `);
  });
});

describe('GET /orders', () => {
  it(`should return all orders with their items for a specific customer given the id 1,
  including order references, dates, product names, unit prices, suppliers, and quantities.`, async () => {
    const customerId = 1;

    const response = await request(server).get('/orders').send({ customer_id: customerId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          order_reference: expect.any(String),
          order_date: expect.any(String),
          product_name: expect.any(String),
          unit_price: expect.any(Number),
          supplier_name: expect.any(String),
          quantity: expect.any(Number)
        })
      ])
    )
  })

  it('should return an error if the customer does not exist', async () => {
    const customerId = 50;

    const response = await request(server).get('/orders').send({ customer_id: customerId });

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: `Customer not found`
      })
    )
  })
})