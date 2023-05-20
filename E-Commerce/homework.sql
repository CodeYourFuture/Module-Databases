-- Query Practice

-- List all the products whose name contains the word "socks":

SELECT * FROM products where product_name LIKE '%socks%';


-- List all the products which cost more than 100 showing product id, name, unit price, and supplier id:

SELECT  id, 
        product_name, 
        unit_price, 
        supp_id 
            FROM products 
                JOIN product_availability 
                    ON products.id=product_availability.prod_id 
                        WHERE unit_price > 100;

-- List the 5 most expensive products:


-- List all the products sold by suppliers based in the United Kingdom. The result should only contain the columns product_name and supplier_name:


-- List all orders, including order items, from customer named Hope Crosby:


-- List all the products in the order ORD006. The result should only contain the columns product_name, unit_price, and quantity:


-- List all the products with their supplier for all orders of all customers. The result should only contain the columns name (from customer), order_reference, order_date, product_name, supplier_name, and quantity:
