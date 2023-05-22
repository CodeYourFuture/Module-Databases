-- Query Practice

-- List all the products whose name contains the word "socks":

SELECT * 
        FROM products 
        WHERE product_name 
        LIKE '%socks%';


-- List all the products which cost more than 100 showing product id, name, unit price, and supplier id:

SELECT  id, 
        product_name, 
        unit_price, 
        supp_id 
            FROM products 
            JOIN product_availability ON products.id = product_availability.prod_id 
            WHERE unit_price > 100;

-- List the 5 most expensive products:

SELECT  id, 
        product_name, 
        unit_price 
            FROM products 
            JOIN product_availability ON products.id=product_availability.prod_id 
            ORDER BY unit_price DESC 
            LIMIT 5;


-- List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name:

SELECT  product_name, 
        supplier_name 
            FROM customers 
            JOIN suppliers ON customers.id = suppliers.id 
            JOIN products ON products.id = suppliers.id  
            WHERE suppliers.country = 'United Kingdom';


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


-- List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity:

SELECT  products.product_name, 
        product_availability.unit_price, 
        order_items.quantity 
            FROM products 
            JOIN product_availability ON product_availability.prod_id = products.id 
            JOIN order_items ON order_items.product_id = product_availability.prod_id 
            JOIN orders ON orders.id = order_items.order_id 
            WHERE orders.order_reference = '0RD006';


-- List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity:

SELECT  customers.name 
        order_reference,
        orders.order_date,
        products.product_name,
        suppliers.supplier_name,
        order_items.quantity
            FROM customers
            JOIN orders ON orders.customer_id = customers.id
            JOIN order_items ON order_items.order_id = orders.id
            JOIN products ON products.id = order_items.product_id
            JOIN suppliers ON suppliers.id = order_items.supplier_id;
