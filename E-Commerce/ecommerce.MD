`List all the products whose name contains the word "socks"--`

```SQL

SELECT * FROM products
WHERE product_name like '%socks';

```

`List all the products which cost more than 100 showing product id, name, unit price, and supplier id`

```SQL

SELECT p.id, p.product_name, p_a.unit_price, p_a.supp_id
FROM products p
JOIN product_availability p_a ON p.id = p_a.prod_id
WHERE unit_price > 100;

```

`List the 5 most expensive products`

```SQL

SELECT p.product_name, p_a.unit_price
FROM products p
JOIN product_availability p_a ON p.id = p_a.prod_id
ORDER BY p_a.unit_price DESC
LIMIT 5;

product_name   | unit_price
-----------------+------------
 Mobile Phone X  |        299
 Mobile Phone X  |        249
 Javascript Book |         41
 Javascript Book |         40
 Javascript Book |         39

?????????????????????????????

SELECT p.product_name, MAX(p_a.unit_price) as higher_price
FROM products p
JOIN product_availability p_a ON (p.id = p_a.prod_id)
GROUP BY p.product_name
ORDER BY higher_price DESC
LIMIT 5;

      product_name       | higher_price
-------------------------+--------------
 Mobile Phone X          |          299
 Javascript Book         |           41
 Tee Shirt Olympic Games |           21
 Ball                    |           20
 Super warm socks        |           10
```

`List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name`

```SQL

SELECT p.product_name, s.supplier_name
FROM products p
JOIN product_availability p_a ON p.id = p_a.prod_id
JOIN suppliers s ON s.id = p_a.supp_id
WHERE s.country = 'United Kingdom';

```

`List all orders, including order items, from customer named Hope Crosby`

```SQL

SELECT orders.id, order_date , products.product_name
FROM orders
JOIN order_items ON (orders.id = order_items.order_id)
JOIN products ON (products.id = order_items.product_id)
JOIN customers ON (orders.customer_id = customers.id)
WHERE customers.name = 'Hope Crosby';

```

`List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity`

```SQL

SELECT product_name, unit_price, quantity
FROM orders
JOIN order_items ON (orders.id = order_items.order_id)
JOIN product_availability ON (product_availability.prod_id = order_items.product_id)
JOIN products ON (product_availability.prod_id = products.id)
WHERE orders.order_reference = 'ORD006';

```

`List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity`

```SQL

SELECT c.name, o.order_reference, order_date, product_name, supplier_name, quantity
FROM customers c
JOIN orders o ON (c.id = o.customer_id)
JOIN order_items oi ON (o.id = oi.order_id)
JOIN products p ON (p.id = oi.product_id)
JOIN suppliers s ON (s.id = oi.supplier_id);

```
