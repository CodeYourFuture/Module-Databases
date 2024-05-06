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
    customers ||--o{ orders : places}
```

### Query Practice

Write SQL queries to complete the following tasks:

- [x] List all the products whose name contains the word "socks"

```sql
    select * from products where product_name like '%sock%';

    -- producing all the names in product table containing 'sock'
```

- [x] List all the products which cost more than 100 showing product id, name, unit price, and supplier id

```sql
    select pv.prod_id , p.product_name ,pv.supp_id,sp.supplier_name , pv.unit_price from product_availability pv join products p on (pv.prod_id=p.id) join suppliers sp on(sp.id=pv.supp_id)  where unit_price>100;

    -- the query shows the product id , its name , supplier id and supplier name , along side the unit_price .
```

- [x] List the 5 most expensive products

```sql
select * from product_availability order by unit_price desc limit 5;
-- the query order unit_pric descending and limit results to first 5 items.

```

- [x] List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name

```sql
    select p.product_name ,sp.supplier_name  from order_items o join products p on (o.product_id=p.id) join suppliers sp on (o.supplier_id=sp.id) where sp.country='United Kingdom';
    -- Query retrieves rpoduct name and supp name from other tables using join
```

- [x] List all orders, including order items, from customer named Hope Crosby

```sql
    select o.id,o.order_date,o.order_reference ,cu.name,pr.product_name from orders o join order_items oi on (o.id=oi.order_id) join customers cu on (o.customer_id=cu.id) join products pr on (oi.product_id=pr.id)  where name='Hope Crosby';
    -- This query connects 4 tabels but it returns only order id  order_date , order_reference , customer name and product name.
```

- [x] List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity

```sql
    select pr.product_name, oi.quantity,sp.supplier_name from orders o join order_items oi on (o.id=oi.order_id) join suppliers sp on (oi.supplier_id=sp.id) join products pr on (pr.id=oi.product_id) where order_reference='ORD006';
```

- [x] List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity

```sql
    select cu.name , o.order_reference , o.order_date,pr.product_name , sp.supplier_name , oi.quantity from orders o join customers cu on (o.customer_id=cu.id) join order_items oi on(oi.order_id=o.id) join products pr on(oi.product_id=pr.id) join suppliers sp on (oi.supplier_id=sp.id) ;
```

## Acceptance Criteria

- [ ] The `cyf_ecommerce` database is imported and set up correctly
- [ ] The database schema is drawn correctly to visualize relationships between tables
- [ ] The SQL queries retrieve the correct data according to the tasks listed above
- [ ] The pull request with the answers to the tasks is opened on the `main` branch of the `E-Commerce` repository
