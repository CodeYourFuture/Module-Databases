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

Don't skip this step. You may one day [be asked at interview](https://monzo.com/blog/2022/03/23/demystipsql -d cyf_ecommerce -f cyf_ecommerce.sqlfyinpsql -d cyf_ecommerce -f cyf_ecommerce.sqlg-the-backend-engineering-interview-process) to draw a database schema. Sketching systems is a valuable skill for back end developers and worth practising. If you're interested in systems design, you may also want to take a course on Udemy.

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

- [ ] List all the products whose name contains the word "socks"
select product_name from products where product_name like '%socks%';
 Super warm socks
(1 row)
- [ ] List all the products which cost more than 100 showing product id, name, unit price, and supplier id
select id, product_name, unit_price, supp_id from products
  inner join product_availability on product_availability.prod_id = products.id where unit_price > 100;
   id |  product_name  | unit_price | supp_id 
----+----------------+------------+---------
  1 | Mobile Phone X |        249 |       4
  1 | Mobile Phone X |        299 |       1
(2 rows)
- [ ] List the 5 most expensive products
select product_name, unit_price from products
  inner join product_availability on product_availability.prod_id = products.id order by unit_price desc limit 5;
    product_name   | unit_price 
-----------------+------------
 Mobile Phone X  |        299
 Mobile Phone X  |        249
 Javascript Book |         41
 Javascript Book |         40
 Javascript Book |         39
(5 rows)

- [ ] List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name
select product_name, supplier_name from products
  inner join product_availability on product_availability.prod_id = products.id inner join suppliers
  on product_availability.supp_id = suppliers.id
  where country like 'United Kingdom';

        product_name       | supplier_name 
-------------------------+---------------
 Javascript Book         | Argos
 Super warm socks        | Argos
 Coffee Cup              | Argos
 Tee Shirt Olympic Games | Argos
 Mobile Phone X          | Sainsburys
 Le Petit Prince         | Sainsburys
 Super warm socks        | Sainsburys
 Coffee Cup              | Sainsburys
 Ball                    | Sainsburys
(9 rows)
 

- [ ] List all orders, including order items, from customer named Hope Crosby

SELECT order_id,product_id,supplier_id,quantity
FROM order_items oi INNER JOIN orders o ON (oi.order_id = o.id)
INNER JOIN customers c ON (o.customer_id = c.id)
WHERE c.name = 'Hope Crosby';

 order_id | product_id | supplier_id | quantity 
----------+------------+-------------+----------
        4 |          1 |           1 |        1
(1 row)


- [ ] List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity

SELECT p.product_name, pa.unit_price,oi.quantity
FROM order_items oi INNER JOIN orders o ON (oi.order_id=o.id)
INNER JOIN products p ON (p.id=oi.product_id)
INNER JOIN product_availability pa ON (p.id=pa.prod_id)
WHERE o.order_reference = 'ORD006';

 product_name   | unit_price | quantity 
------------------+------------+----------
 Coffee Cup       |          3 |        3
 Coffee Cup       |          4 |        3
 Coffee Cup       |          4 |        3
 Coffee Cup       |          5 |        3
 Javascript Book  |         40 |        1
 Javascript Book  |         41 |        1
 Javascript Book  |         39 |        1
 Le Petit Prince  |         10 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
 Super warm socks |          5 |        3

- [ ] List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity

## Acceptance Criteria

- [ ] The `cyf_ecommerce` database is imported and set up correctly
- [ ] The database schema is drawn correctly to visualize relationships between tables
- [ ] The SQL queries retrieve the correct data according to the tasks listed above
- [ ] The pull request with the answers to the tasks is opened on the `main` branch of the `E-Commerce` repository
