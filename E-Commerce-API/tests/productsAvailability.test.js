describe("POST /product-availability", () => {
  afterEach(async () => {
    await global.dbClient.query("DELETE FROM product_availability WHERE prod_id = 1 AND supp_id = 2;");
  });

  it(`should to create a new product availability with a price and supplier ID`,
    async () => {
      const newProductAvailability = {
        prod_id: 1,
        supp_id: 2,
        unit_price: 10
      };
      const response = await request(server).post("/product-availability").send(newProductAvailability);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining(newProductAvailability)
      )
    })
  it(`should return an error if any parameter is not a number or not a positive integer`, async () => {
    const newProductAvailability = {
      prod_id: -1,
      supp_id: 2,
      unit_price: 10
    };
    const response = await request(server).post("/product-availability").send(newProductAvailability);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "prod_id has to be a positive integer"
      })
    );

    const newProductAvailability2 = {
      prod_id: 1,
      supp_id: -2,
      unit_price: 10
    };
    const response2 = await request(server).post("/product-availability").send(newProductAvailability2);

    expect(response2.status).toBe(400);
    expect(response2.body).toEqual(
      expect.objectContaining({
        error: "supp_id has to be a positive integer"
      })
    );

    const newProductAvailability3 = {
      prod_id: 1,
      supp_id: 2,
      unit_price: -10
    };
    const response3 = await request(server).post("/product-availability").send(newProductAvailability3);

    expect(response3.status).toBe(400);
    expect(response3.body).toEqual(
      expect.objectContaining({
        error: "unit_price has to be a positive integer"
      })
    );
  });
  // it(`should return an error if the product availability already exists`)
  // it(`should return an error if the price is not a positive integer`)
  // it(`should return an error if either the product or supplier ID does not exist`)
})