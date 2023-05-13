# Project Brief: E-Commerce API

You are a developer building an Express application to connect your e-commerce database to a shop front. Your client requires a fully tested API so you will write this application TDD-style: writing the test first and then the code to make the test pass. There is a starter test given to help you, that satisfies the first user story.

You're just looking to implement the API, not a frontend which uses the API (though feel free as an extension, if you're interested!)

How will you make this test pass?

## Learning Objectives
```objectives
- Write unit tests for new API endpoints
- Implement new API endpoints that meet user requirements
- Practice TDD development workflow
- Handle errors for invalid data inputs
- Use Git feature branch workflow
- Manage secrets in a shared codebase
```
## User Stories

As a developer, I want to add new API endpoints to the NodeJS application for the cyf-ecommerce-api, so that I can improve the functionality of the application.

As a developer, I want to build up my API using TDD - writing the test first and then iterating : adding one feature to pass one unit test.

1. As a user, I want to view a list of all products with their prices and supplier names.
1. As a user, I want to search for products by name.
1. As a user, I want to view a single customer by their ID.
1. As a user, I want to create a new customer with their name, address, city, and country.
1. As a user, I want to create a new product.
1. As a user, I want to create a new product availability with a price and supplier ID, and get an error if the price is not a positive integer or if either the product or supplier ID does not exist.
1. As a user, I want to create a new order for a customer with an order date and reference number, and get an error if the customer ID is invalid.
1. As a user, I want to update an existing customer's information with their name, address, city, and country.
1. As a user, I want to delete an existing order and all associated order items.
1. As a user, I want to delete an existing customer only if they do not have any orders.
1. As a user, I want to view all orders with their items for a specific customer, including order references, dates, product names, unit prices, suppliers, and quantities.

**These user stories describe the API. Do not build a front end or database.**

## Acceptance Criteria

- [ ] Each user story has an accompanying unit test
- [ ] Secrets are not stored in the codebase

<details>
<summary>Try writing out your own acceptance criteria from the user stories before looking here</summary>

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
</details>

### Quality check!

In this project, you must write the test first.

It's better to turn in a smaller set of completed user stories than to turn in untested features.

If you're running out of time, scope down your application rather than commit untested code. Cut your _scope_, not your quality.
