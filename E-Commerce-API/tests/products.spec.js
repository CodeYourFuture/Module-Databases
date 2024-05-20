import request from "supertest";
import app from "../app.js";


describe("GET /products", () => {
  it("should return a list of all product names with their prices and supplier names", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_name: expect.any(String),
          unit_price: expect.any(Number),
          supplier_name: expect.any(String),
        }),
      ])
    );
  });
});
describe('Get / products single', () => {
  it("should return product name search bt product name.", async () => {
    const response = await request(app).get("/products/le");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_name: expect.any(String),
        }),
      ])
    );
  });
})

describe('Get a customer details', () => {
  it('get customer by id', async () => {
    const res = await request(app).get('/customers/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),

        }),
      ])
    )
  })
})

describe('when passed product name, address, city, and country', () => {
  const newCustomer = {
    name: "Drink water",
    address: "Wolverhampton",
    city: "Birmingham",
    country: 'UK',
  }

  it("should add new customer in customers table", async () => {
    request(app).post('/customers').send(newCustomer)
      .set('Accept', 'application/json')
      .set('Content-Type', '/json/')
      .expect(200)
      .end(function (err, res) {
        return (err)
      });
  });

});

describe('when passed product name', () => {
  it('should add new product to the existing products', async () => {
    const response = await request(app).post("/products").send({
      product_name: "Dell",
    })
    expect(response.statusCode).toBe(201)
  })
})

describe('when passed supplier ID and price', () => {
  it('should add new product in existing product availability', async () => {
    const response = await request(app).post('/availability').send({
      prod_id: 1,
      supp_id: 2,
      unit_price: 20,
    })
    expect(response.statusCode).toBe(201);
  })

  it('check unit price of product is above zero', async () => {
    const response = await request(app).post('/product_availability').send({
      prod_id: 7,
      supp_id: 2,
      unit_price:-2,
    })
    expect(response.statusCode).toBe(404);
  })

  it('Product ID should not be missing!', async () => {
    const response = await request(app).post('/product_availability').send({
      prod_id: null,
      supp_id: 2,
      unit_price: 0,
    })
    expect(response.statusCode).toBe(404);
  })

  it('Supplier ID should not be missing!', async () => {
    const response = await request(app).post('/product_availability').send({
      prod_id: 22,
      supp_id: null,
      unit_price: 0,
    })
    expect(response.statusCode).toBe(404);
  })
})

describe('when passed order date and order reference and customer ID', () => {
  it('should create new order in existing orders', async () => {
    const response = await request(app).post('/customers/5/orders').send({
      order_date: '2019-05-24',
      order_reference: 'ORD011',
      customer_id: 5,
    })
    expect(response.statusCode).toBe(201);
  })

  it('validate the customer ID', async () => {
    const response = await request(app).post('/customers/5/orders').send({
      order_date: '2019-05-24',
      order_reference: 'ORD011',
      customer_id:-1,//invalid customers ID
    })
    expect(response.statusCode).toBe(400);
  })
})

describe('Given ')