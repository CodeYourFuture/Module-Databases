SELECT
    p.product_name,
    pa.prod_id,
    pa.supp_id,
    pa.unit_price
FROM
    product_availability pa
    JOIN products p ON pa.prod_id = p.id;