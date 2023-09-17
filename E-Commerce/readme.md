# Project Brief: E-Commerce Database

In this project, you will work with an e-commerce database. The database has products that consumers can buy from different suppliers. Customers can create an order and add several products in one order.

## Learning Objectives

- Use SQL queries to retrieve specific data from a database
- Draw a database schema to visualize relationships between tables
- Label database relationships defined by the `REFERENCES` keyword in `CREATE TABLE` commands

## Requirements

### Setup

To prepare your environment, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

### Understand the schema

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relationships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

Don't skip this step. You may one day [be asked at interview](https://monzo.com/blog/2022/03/23/demystifying-the-backend-engineering-interview-process) to draw a database schema. Sketching systems is a valuable skill for back end developers and worth practising. If you're interested in systems design, you may also want to take a course on Udemy.

You can even [draw relationship diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) on [GitHub](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams):

```mermaid
erDiagram
    customers {
        id INT PK
        name VARCHAR(50) NOT NULL
    }
    customers ||--o{ orders : places
```

### Query Practice

Write SQL queries to complete the following tasks:

- [x] List all the products whose name contains the word "socks"

```psql
SELECT * FROM products
WHERE product_name LIKE '%socks%'
```

- [x] List all the products which cost more than 100 showing product id, name, unit price, and supplier id

```psql
SELECT p1.prod_id, p1.supp_id, p1.unit_price, p2.product_name FROM product_availability p1
JOIN products p2
ON p1.prod_id = p2.id
WHERE unit_price = 100
```

- [x] List the 5 most expensive products

```psql
SELECT * FROM product_availability
ORDER BY unit_price DESC
LIMIT 5
```

- [ ] List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name

```psql
SELECT s.supplier_name, p.product_name, s.country
FROM products p	
JOIN product_availability pa
ON p.id = pa.prod_id
JOIN suppliers s ON supp_id = s.id
WHERE country = 'United Kingdom'
```

- [x] List all orders, including order items, from customer named Hope Crosby

```psql
select customers.name , tab.* from customers
join (
	SELECT * FROM orders
	Join order_items
	ON orders.id = order_items.order_id
	) AS tab
ON customers.id = tab.customer_id
where name = 'Hope Crosby'
```

- [x] List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity

```psql
SELECT
    p.product_name,
    pa.unit_price,
    oi.quantity
FROM orders
JOIN order_items oi ON orders.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN product_availability pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id
WHERE orders.order_reference = 'ORD006';
```

- [x] List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity

```psql
SELECT
	c.id, c.name,
	o.order_reference, o.order_date,
	p.product_name,
	s.supplier_name,
	oi.quantity
FROM orders o
	JOIN order_items oi ON oi.id = o.id
	JOIN customers c ON c.id = o.customer_id
	Join products p  ON p.id = oi.order_id
	JOIN suppliers s ON s.id = oi.supplier_id
```

## Acceptance Criteria

- [ ] The `cyf_ecommerce` database is imported and set up correctly
- [ ] The database schema is drawn correctly to visualize relationships between tables
- [ ] The SQL queries retrieve the correct data according to the tasks listed above
- [ ] The pull request with the answers to the tasks is opened on the `main` branch of the `E-Commerce` repository
