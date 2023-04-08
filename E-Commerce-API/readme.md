# Project Brief: E-Commerce API

## User Stories

As a developer, I want to add new API endpoints to the NodeJS application for the cyf-ecommerce-api, so that I can improve the functionality of the application.

- As a user, I want to view a list of all products with their prices and supplier names.
- As a user, I want to search for products by name.
- As a user, I want to view a single customer by their ID.
- As a user, I want to create a new customer with their name, address, city, and country.
- As a user, I want to create a new product.
- As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
- As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid.
- As a user, I want to update an existing customer's information with their name, address, city, and country.
- As a user, I want to delete an existing order and all associated order items.
- As a user, I want to delete an existing customer only if they do not have any orders.
- As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.

## Acceptance Criteria

- [ ] Endpoint `/products` should return a list of all product names with their prices and supplier names.
- [ ] Endpoint `/products` should filter the list of products by name using a query parameter, even if the parameter is not used.
- [ ] Endpoint `/customers/:customerId` should load a single customer by their ID.
- [ ] Endpoint `/customers` should create a new customer with name, address, city, and country.
- [ ] Endpoint `/products` should create a new product.
- [ ] Endpoint `/availability` should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database.
- [ ] Endpoint `/customers/:customerId/orders` should create a new order for a customer, including an order date and order reference. An error should be returned if the customer ID doesn't correspond to an existing customer.
- [ ] Endpoint `/customers/:customerId` should update an existing customer's information.
- [ ] Endpoint `/orders/:orderId` should delete an existing order and all associated order items.
- [ ] Endpoint `/customers/:customerId` should delete an existing customer only if the customer doesn't have any orders.
- [ ] Endpoint `/customers/:customerId/orders` should load all the orders along with the items in the orders of a specific customer. The information returned should include order references, order dates, product names, unit prices, suppliers, and quantities.
