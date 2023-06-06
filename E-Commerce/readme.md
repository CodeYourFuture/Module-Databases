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

## Ecommerse mermaid diagram

```mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : "has"
    CUSTOMERS {
            id INT PK
            name varchar(50)
            address varchar(120)
            city varchar(30)
            country varchar(20)
    }
    ORDERS ||--|{ ORDER_ITEMS : "has"
    ORDERS {
        id int
        order_date date
        order_reference varchar(10)
        customer_id int
    }
    %%ORDER_ITEMS ||--|{ SUPPLIERS : "has"
    ORDER_ITEMS ||--o{ PRODUCT_AVAILABILITY : "has"
    ORDER_ITEMS {
        id int
        order_id int
        product_id int fk
        supplier_id int fk
        quantity int
    }
    PRODUCT_AVAILABILITY }o--|| PRODUCTS : "has"
    PRODUCT_AVAILABILITY {
        prod_id int pk
        supp_id int pk
        unit_price int

    }
    PRODUCTS {
        id int pk
        product_name varchar(100)
    }
SUPPLIERS ||--o{ PRODUCT_AVAILABILITY : "supplies"
SUPPLIERS {
id int pk
supplier_name varchar(100)
country varchar(20)
}

```

```sql

```

### Query Practice

Write SQL queries to complete the following tasks:

- [ ] List all the products whose name contains the word "socks"

```sql
    SELECT *
        FROM products
            WHERE product_name
                LIKE '%socks%';
```

- [ ] List all the products which cost more than 100 showing product id, name, unit price, and supplier id

```sql
SELECT p.id, p.product_name, pa.unit_price, pa.supp_id
            FROM products as p
			JOIN product_availability as pa ON pa.prod_id = p.id
                WHERE pa.unit_price > 100;
```

- [ ] List the 5 most expensive products

```sql
SELECT p.id, p.product_name, pa.unit_price, pa.supp_id
            FROM products as p
			JOIN product_availability as pa ON pa.prod_id = p.id
				ORDER BY pa.unit_price DESC
                LIMIT 5;
```

- [ ] List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name

```sql
SELECT p.product_name, s.supplier_name
        FROM products as p
        JOIN product_availability as pa ON pa.prod_id = p.id
        JOIN suppliers as s ON s.id = pa.supp_id
            WHERE s.country = 'United Kingdom';

```

- [ ] List all orders, including order items, from customer named Hope Crosby

```sql
    SELECT o.*, oi.*
        FROM orders as o
        JOIN order_items as oi ON o.id = oi.order_id
        JOIN customers as c ON c.id = o.customer_id
            WHERE c.name = 'Hope Crosby';

```

- [ ] List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity

```sql
    SELECT p.product_name, pa.unit_price, oi.quantity
        FROM products as p
        JOIN product_availability as pa ON pa.prod_id = p.id
        JOIN order_items as oi ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id
        JOIN orders as o ON o.id = oi.order_id
            WHERE o.order_reference = 'ORD006';
```

- [ ] List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity

```sql
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity
        FROM customers as c
            JOIN orders as o ON o.customer_id = c.id
            JOIN order_items as oi ON oi.order_id = o.id
            JOIN product_availability as pa ON pa.prod_id = oi.product_id AND pa.supp_id = oi.supplier_id
            JOIN products as p ON p.id = pa.prod_id
            JOIN suppliers as s ON s.id = pa.supp_id;

```

## Acceptance Criteria

- [ ] The `cyf_ecommerce` database is imported and set up correctly
- [ ] The database schema is drawn correctly to visualize relationships between tables
- [ ] The SQL queries retrieve the correct data according to the tasks listed above
- [ ] The pull request with the answers to the tasks is opened on the `main` branch of the `E-Commerce` repository
