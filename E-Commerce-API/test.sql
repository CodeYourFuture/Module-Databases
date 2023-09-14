select
  p.product_name,
  p_a.unit_price,
  s.supplier_name
from
  products p
  join product_availability p_a on p.id = p_a.prod_id
  join suppliers s on p.id = s.id;