const { pg } = require('pg');


/* PostgreSQL database*/

/*CREATE TABLESPACES*/

/*
CREATE TABLESPACE ts_primary
LOCATION 'c:\pgdata\primary';

CREATE TABLESPACE ts_archive
LOCATION 'c:\<directory>'*/


/*VIEW ACTIVE DATABASE CONNNECTIONS  (could wrap this in an if statement)*/

/*SELECT
  *
FROM
  pg_stat_activity
WHERE
  datname = 'productsdb';*/

/* DISCONNECT FROM DATABASE*/

/*SELECT
	pg_terminate_backend (pg_stat_activity.pid)
FROM
	pg_stat_activity
WHERE
	pg_stat_activity.datname = 'productsdb';*/

/* CREATE DATABASE */

/*DROP DATABASE IF EXISTS productsdb;
CREATE DATABASE productsdb
WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  TABLESPACE = ts_primary
  IS_TEMPLATE = true;*/

/*should I create a new schema?*/

/*DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  product_id integer PRIMARY KEY,
  product_name text NOT NULL,
  slogan text,
  product_description text,
  category text NOT NULL,
  default_price numeric(12, 2)
);


DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  feature_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products,
    ON DELETE CASCADE
  feature text NOT NULL,
  feature_value text NOT NULl,
  UNIQUE (product_id, feature, feature_value)
);*/

/* might want to use the HSTORE data type instead for features (can convert to json or a set), or honestly just keep it in json*/


/*DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products,
    ON DELETE CASCADE
  style_name text NOT NULL,
  sale_price numeric(12, 2) DEFAULT NULL,
  original_price numeric(12, 2) DEFAULT (SELECT default_price FROM products INNER JOIN styles USING (product_id)),
  default_style boolean DEFAULT (false)
);

COPY styles
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/styles.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);


/*DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  photo_id int PRIMARY KEY,
  style_id integer,
  photo_url varchar(1500),
  thumbnail_url text
);

COPY photos
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/photos3.csv' DELIMITER ',' CSV
HEADER;


/*DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus (
  sku integer PRIMARY KEY,
  style_id integer NOT NULL,
  size text NOT NULL,
  quantity integer DEFAULT 0
);

COPY skus
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/skus.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

/*DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  related_product_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id integer REFERENCES products NOT NULL,
  related_id integer NOT NULL
);

COPY related
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/related.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

/*client.end();

to exit, control (or command?) d or \q

to run sript: in CLI (outside of postgres), psql <database_name> < <name of file you want to run>
*/



/*PRODUCT:

*/


/*should check how atelier returns null feature values*/
/* could also return features as an array of objects using a subquery like below:

    The current query below lists all team names with their division name. I basically need to list all teams UNDER their respective division. I believe I need some sort of SELECT DISTINCT call but I am absolutely lost on what to correct terms to search for. Can anyone point me in the right direction? Is it best to do it in the Postgres query or should it be handled on the server (after the current response is returned)?

    Minimal examples below, Teams and Divisions tables are basically set up as id and name

    Pivot table

    id | team_id | season_id | division_id
    --------------------------------------
    1  |    3    |     1     |      3
    2  |    4    |     1     |      3
    3  |    5    |     1     |      3
    4  |    6    |     1     |      3
    Query to list all teams and their division name

    SELECT t.name AS team_name, d.name AS division_name FROM team_season_division tsd
    JOIN teams t ON t.id = tsd.team_id
    JOIN divisions d ON d.id = tsd.division_id
    WHERE tsd.season_id = 1;

by putting f.product_id = $1 in subquery where clause => might be faster query time*/

/* should I make a pivot table - prolly*/

/*
  JSON_BUILD_OBJECT('product_id', CAST (product_id AS text), 'results', JSONB_AGG(
  SELECT
    CAST (product_id AS text),
    ARR_AGG(
      JSON_BUILD_OBJECT(
        'style_id', style_id,
        'name', style_name,
        'original_price', CAST (orginal_price AS text),
        'sale_price', CAST (sale_price AS text),
        'default?', default_style,
        'photos', ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'thumbnail_url', thumbnail_url,
            'url', photo_url,
          )
        )
      )
    )
  AS results
  FROM styles
  INNER JOIN photos USING (style_id)
  INNER JOIN skus USING (style_id)
  WHERE product_id = 2;
)

SONB_AGG(
      JSON_BUILD_OBJECT('url', ph.photo_url , thumbnail_url, ph.thumbnail_url) AS photos
      GROUP BY photo_id)
FROM products p
WHERE p.product_id = 2*/

/* make sure dealing with possible null value returned for photos array and for skus array*/



/*FILTER (WHERE ps.photo_id IS NOT NULL), '[]') AS photos
  COALESCE(
*/
/*
SELECT rows FROM (SELECT
        ps.thumbnail_url,
        ps.photo_url AS url,
      ) AS rows


// could do outer left join on product_id and then group by product_id and then do the json_agg for the features on feature_id
// a diff query (maybe using in or using the product_id directly) might be faster than left join, b/c not mapping the whole join. could also make feature_id somehow rooted in product_id, like maybe reserve 100 spots for each feature id in a sequence after product_id, or could use a base other than 10, or could maybe use decimals?  would this be any faster than indexing product_id


STYLES:
// product_id as string (you can use SELECT <product_id given>)
// results as json_agg (can use SELECT <"results"> if cannot use alias)
 // everything from styles
 //photos as json_agg (left join)
   // url, thumbnail_url
   // check what to return if no url or thumbnail url or product_id not in photos
 // skus as json_object_agg (inner join)
  // sku as json_object_agg
    // size, quantity
  // order by sku ascending
 // order by style_id asc



WITH ss AS (
  SELECT
    *
  FROM
    styles s
  WHERE
    product_id = $1
  ORDER BY
    style_id
), ks AS (
  SELECT (
    k.sku,
    k.style_id,
    k.size,
    k.quantity
  )
  FROM
    (SELECT k.* FROM skus k, ss WHERE k.style_id = ss.style_id)

  FROM
    (SELECT a.* FROM answers a, qs WHERE a.question_id = qs.id AND a.reported = false)
  GROUP BY
    k.sku,
    k.size,
    k.quantity
)
SELECT
  ss.style_id AS style_id,
  ss.style_name AS "name",
  ss.orginal_price AS original_price,
  ss.sale_price AS sale_price,
  ss.default_style AS "default?",
  COALESCE(
    json_agg(
      (SELECT rows FROM (SELECT
        ps.thumbnail_url,
        ps.photo_url AS url,
      ) AS rows)
    )
  FILTER (WHERE ps.photo_id IS NOT NULL), '[]') AS photos
  COALESCE(
    json_object_agg(
      ks.sku
      (SELECT rows FROM (SELECT
        ks.size,
        ks.quantity,
      ) AS rows)
    )
  FILTER (WHERE ks.sku IS NOT NULL), '{}') AS skus
FROM
  ss,
  ps, ks
GROUP BY
  ss.style_id,
  ss.style_name,
  ss.original_price,
  ss.sale_price,
  ss.default_style,
ORDER BY
  ss.style_id ASC
;*/

/*
  {
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                }
  			// ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  // ...
}*/


/*RELATED:
// return array with product_id of related styles
// json_agg or maybe not?
SELECT related_id
FROM related
WHERE product_id = <given product_id>
ORDER BY related_id ASC
// check via table query (is not in) & postman what should return if no related products, use coalesce*/


/*in real scenario, for an isntance what is maximum rps usually
see metrics to collect in performance testing, if the value provided in learn is realistic

the bmr is 1000, but nudge to move onto horizontal scaling if you hit 200

queries should be less than 50 ms when run with explain analyze against database

// test 3 queries in explain analyze and make sure under 50 ms, if not index
locally stress test kasik*/
WITH s AS (SELECT style_id, style_name, original_price, sale_price, default_style AS "default?", ARRAY_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', photo_url)) AS photos FROM styles INNER JOIN photos USING(style_id) WHERE product_id = 2 GROUP BY style_id)
SELECT product_id, s AS results;

SELECT CAST (product_id AS text), ARRAY_AGG(JSON_BUILD_OBJECT('style_id', style_id, 'name', style_name, 'sale price', sale_price, 'original_price', original_price, 'default?', default_style, 'photos',
ARRAY_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', photo_url)))) AS results FROM styles INNER JOIN photos USING (style_id) INNER JOIN skus USING (style_id) WHERE product_id = 2 GROUP BY style_id;