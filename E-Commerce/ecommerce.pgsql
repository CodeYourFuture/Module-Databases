-- List all the products whose name contains the word "socks"
SELECT
    *
FROM
    products;

SELECT
    *
FROM
    products
WHERE
    product_name ILIKE '%socks%';

-- List all the products which cost more than 100 showing product id, name, unit price, and supplier id
SELECT
    *
FROM
    products;

SELECT
    *
FROM
    product_availability;

SELECT
    p.id,
    p.product_name,
    pa.unit_price,
    pa.supp_id
FROM
    products p
    INNER JOIN product_availability pa ON (p.id = pa.prod_id)
WHERE
    unit_price > 100;

-- List the 5 most expensive products
SELECT
    *
FROM
    products;

SELECT
    p.product_name,
    MAX(pa.unit_price) price
FROM
    products p
    INNER JOIN product_availability pa ON (p.id = pa.prod_id)
GROUP BY
    p.product_name
ORDER BY
    price DESC
LIMIT 5;

-- List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name
SELECT
    *
FROM
    suppliers;

SELECT
    p.product_name,
    s.supplier_name
FROM
    products p
    INNER JOIN product_availability pa ON (p.id = pa.prod_id)
    INNER JOIN suppliers s ON (s.id = pa.supp_id)
WHERE
    s.country = 'United Kingdom';

-- List all orders, including order items, from customer named Hope Crosby
SELECT
    *
FROM
    customers;

SELECT
    *
FROM
    orders;

SELECT
    *
FROM
    order_items;

SELECT
    c.name,
    o.order_date,
    o.order_reference,
    oi.quantity,
    oi.product_id
FROM
    orders o
    INNER JOIN order_items oi ON (o.id = oi.order_id)
    INNER JOIN customers c ON (c.id = o.customer_id)
WHERE
    c.name = 'Hope Crosby';

-- List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity
SELECT
    *
FROM
    orders;

SELECT
    *
FROM
    order_items;

SELECT
    *
FROM
    product_availability;

SELECT
    *
FROM
    products;

SELECT
    *
FROM
    suppliers;

SELECT
    p.product_name,
    pa.unit_price,
    oi.quantity
FROM
    orders o
    INNER JOIN order_items oi ON (o.id = oi.order_id)
    INNER JOIN product_availability pa ON (oi.product_id = pa.prod_id
            AND oi.supplier_id = pa.supp_id)
    INNER JOIN products p ON (pa.prod_id = p.id)
WHERE
        o.order_reference = 'ORD006';

-- List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity
SELECT
    *
FROM
    customers;

SELECT
    c.name,
    o.order_reference,
    o.order_date,
    p.product_name,
    s.supplier_name,
    oi.quantity
FROM
    customers c
    INNER JOIN orders o ON (c.id = o.customer_id)
    INNER JOIN order_items oi ON (o.id = oi.order_id)
    INNER JOIN product_availability pa ON (oi.product_id = pa.prod_id
            AND oi.supplier_id = pa.supp_id)
    INNER JOIN products p ON (pa.prod_id = p.id)
    INNER JOIN suppliers s ON (pa.supp_id = s.id);

-- List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity
SELECT
    c.name,
    o.order_reference,
    o.order_date,
    p.product_name,
    s.supplier_name,
    oi.quantity
FROM
    products p
    INNER JOIN product_availability pa ON (pa.prod_id = p.id)
    INNER JOIN suppliers s ON (s.id = pa.supp_id)
    INNER JOIN order_items oi ON (oi.product_id = pa.prod_id
            AND oi.supplier_id = pa.supp_id)
        INNER JOIN orders o ON (o.id = oi.order_id)
        INNER JOIN customers c ON (c.id = o.customer_id);

