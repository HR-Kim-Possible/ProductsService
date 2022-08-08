

/* maybe include copy commands here and ran them inside a transaction,  but transactions don't update the db until transaction complete. so maybe do keep in db initialization scritpt*/

/*delete rows in styles table where default_price in products table and original_price for that product_id in styles table <=  1*/
/*delete from styles
where original_price <= 1 in (select * from styles where product_id in
(select product_id from products where product_id in
(select product_id from products where default_price <= 1)));*/

/*delete from styles, products
{ <join products on product_id> }
where styles.product_id in
(select product_id from styles where styles.original_price <= 1 AND where styles.product_id in
(select product_id from products where products.default_price <= 1));*/

/*DELETE FROM styles s
WHERE s.product_id IN
  (SELECT p.product_id,
    FROM styles s, products p
    WHERE
      s.product_id = p.product_id
      AND s.original_price <= 1
      AND p.default_price <= 1 );*/


/*using products p
where
  (s.product_id = p.product_id
  and s.original_price >= 1
  and p.default_price >= 1)
;*/


/*select styles.*, products.product_id, products.default_price
from styles, products
where
  styles.product_id = products.product_id
  and styles.original_price <= 1
  and products.default_price <= 1
;*/

/*SELECT s.product_id, s.style_id, s.original_price, p.default_price, p.product_id
FROM styles s
FULL OUTER JOIN products p
  ON s.product_id = p.product_id
WHERE s.original_price <= 1 AND p.default_price <= 1;*/


/*// delete any duplicate rows  - n/a b/c product_id is unique
//  make default price a string - do in alter table after deleting zero values
// make sure default price has correct # of digits displayed
// move price type to integer (will need to get rid of percision) and set default to 0 and not null - not doing today
// make product name to unique maybe? no */

/*BEGIN

/*ALTER TABLE products
ALTER COLUMN default_price
  SET DEFAULT 0,
  SET DATA TYPE varchar(13),
  SET NOT NULL;

  COMMIT*/

  /* change sale_price to null where sale_price is not less than original price
UPDATE styles
SET sale_price = NULL
Where (sale_price >= original_price);*/

/*ALTER TABLE STYLES
ALTER COLUMN sale_price SET DATA TYPE varchar(13),
ALTER COLUMN original_price SET DATA TYPE varchar(13),*/


/*// constraint sale price must be less than default price
  // change sale price to null if not
// constraint must have default or original price greater than $1
  // delete styles w/ product_id and products with product_id if not
// check if any original_price are null, and if so can replace with default price
// check out the default_style column
// delete any duplicate rows
// make prices strings
// make default_style true for the lowest style_id out of all style_ids for a product_id
// maybe make primary key (product_id, style)?


// add " in csv lines where needed
// delete rows with deleted style_id
// make style_id foreign key
// delete any duplicate rows
// decide what to do if either one of them is null
// make photo_url unique
// make thumbnail_url unique
// maybe group the thumbnail and photo url together in a json object
*/

/* for skus table:
 make style_id foreign key
// if (style_id, size) is not unique take the quantity columns and add them and update the quantity for one row and delete the other
// make quantity default 0
//delete rows for deleted styles
// set primary key as (style, sku) or maybe even (product, style, sku)
*/

/* for related table:

// delete rows where related_id = 0
// related_id make product_id foreign key
// delete rows where product_id or related_id = deleted product_id
// maybe pool the request with the products columns for each of the related product?
// or could make a separate query for the info for related products, because it's not as much?  though this might not jive with the client
*/