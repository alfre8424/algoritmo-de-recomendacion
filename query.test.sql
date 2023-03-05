select p.name, p.unit, cp.price, c.name from product p join commerce_product cp join commerce c on (cp.commerce_id = c.id) on(cp.product_id = p.id) where p.name like "%leche%" order by p.name;
