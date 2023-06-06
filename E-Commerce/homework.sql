-- Query Practice
-- List all the products whose name contains the word "socks":

SELECT * 
      FROM products 
          where product_name 
              LIKE '%socks%';

 id |   product_name   
----+------------------
  4 | Super warm socks
(1 row)

-- List all the products which cost more than 100 showing product id, name, unit price, and supplier id:

SELECT id, product_name, unit_price, supp_id 
    FROM products 
        JOIN product_availability 
            ON products.id=product_availability.prod_id 
                WHERE unit_price > 100;

 id |  product_name  | unit_price | supp_id 
----+----------------+------------+---------
  1 | Mobile Phone X |        249 |       4
  1 | Mobile Phone X |        299 |       1
(2 rows)

-- List the 5 most expensive products:

SELECT product_name,unit_price 
    FROM product_availability 
        JOIN products 
            on products.id=product_availability.prod_id 
                ORDER BY unit_price 
                    DESC LIMIT  5;

  product_name   | unit_price 
-----------------+------------
 Mobile Phone X  |        299
 Mobile Phone X  |        249
 Javascript Book |         41
 Javascript Book |         40
 Javascript Book |         39
(5 rows)

-- List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name:

SELECT products.product_name, suppliers.supplier_name
    FROM products
        JOIN product_availability
            ON products.id = product_availability.prod_id
                JOIN  suppliers
                    ON  product_availability.supp_id = suppliers.id
                        WHERE suppliers.country = 'United Kingdom';


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

-- List all orders, including order items, from customer named Hope Crosby:

SELECT  customers.name, 
        products.product_name, 
        orders.order_date, 
        orders.order_reference, 
        order_items.order_id, 
        order_items.quantity  
            FROM customers 
                JOIN orders ON customers.id = orders.customer_id 
                    JOIN order_items ON order_items.order_id = orders.id 
                        JOIN products ON products.id = order_items.product_id 
                            WHERE customers.name = 'Hope Crosby';

    name     |  product_name  | order_date | order_reference | order_id | quantity 
-------------+----------------+------------+-----------------+----------+----------
 Hope Crosby | Mobile Phone X | 2019-05-24 | ORD004          |        4 |        1
(1 row)

-- List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity:

SELECT product_name, unit_price, quantity
    FROM orders
        INNER JOIN order_items
            ON orders.id = order_items.order_id
                INNER JOIN product_availability
                    on order_items.product_id = product_availability.prod_id
                        INNER JOIN products
                            ON product_availability.prod_id = products.id
                                WHERE order_reference LIKE '%ORD006%';

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
 Super warm socks |          8 |        3
 Super warm socks |         10 |        3
(13 rows)


-- List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity:

SELECT name, order_reference, order_date, product_name, supplier_name, quantity
    FROM products
        INNER JOIN product_availability
            ON products.id = product_availability.prod_id
                INNER JOIN order_items
                    ON product_availability.prod_id = order_items.product_id
                        INNER JOIN orders
                            ON order_items.order_id = orders.id
                                INNER JOIN suppliers
                                    ON product_availability.supp_id = suppliers.id
                                        INNER JOIN customers
                                            ON orders.customer_id = customers.id;

        name        | order_reference | order_date |      product_name       | supplier_name | quantity 
--------------------+-----------------+------------+-------------------------+---------------+----------
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Sainsburys    |        1
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Sainsburys    |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Amazon        |        1
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Amazon        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Taobao        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Taobao        |        2
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Argos         |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Argos         |        2
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Amazon        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Amazon        |        2
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Sainsburys    |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Sainsburys    |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Sainsburys    |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Amazon        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Amazon        |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Amazon        |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Sainsburys    |        5
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Sainsburys    |       15
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Sainsburys    |        3
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Sainsburys    |        4
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Sainsburys    |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Argos         |        5
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Argos         |       15
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Argos         |        3
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Argos         |        4
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Argos         |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Taobao        |        5
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Taobao        |       15
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Taobao        |        3
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Taobao        |        4
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Taobao        |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Amazon        |        5
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Amazon        |       15
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Amazon        |        3
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Amazon        |        4
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Amazon        |        5
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Sainsburys    |        3
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Sainsburys    |       10
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Argos         |        3
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Argos         |       10
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Taobao        |        3
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Taobao        |       10
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Amazon        |        3
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Amazon        |       10
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Taobao        |        1
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Taobao        |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Taobao        |        2
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Sainsburys    |        1
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Sainsburys    |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Sainsburys    |        2
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Amazon        |        1
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Amazon        |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Amazon        |        2
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Argos         |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Argos         |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Taobao        |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Taobao        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Amazon        |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Amazon        |        1
(59 rows)