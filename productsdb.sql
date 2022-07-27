
const { Client } = require('pg');

const client = new Client();
client.connect();
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
});

DROP TABLE products;
CREATE TABLE products (
  product_id integar PRIMARY KEY,
  name text NOT NULL,
  slogan text,
  description text,
  category text NOT NULL,
  default_price numeric(6, 2)
);

DROP TABLE features;
CREATE TABLE features (
  feature_id GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  feature text,
  value text,
  product_id NOT NULL
);

DROP TABLE styles;
CREATE TABLE styles (
  style_id integar PRIMARY KEY,
  name text NOT NULL,
  original_price numeric(6, 2) CHECK (price > 0),
  sale-price numeric(6, 2),
  CONSTRAINT sale_price_discounted CHECK (original_price > sale_price),
  default? boolean DEFAULT f,
  product_id NOT NULL REFERENCES products,
  UNIQUE (style_id, product_id)
);

DROP TABLE photos;
CREATE TABLE photos (
  photo_id GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  thumbnail_url text,
  url text,
  style_id integar NOT NULL REFERENCES styles,
  product_id NOT NULL REFERENCES product,
  UNIQUE (thumbnail_url, url)
);

DROP TABLE skus;
CREATE TABLE skus (
  sku_id GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  sku integar NOT NULL,
  quantity integar DEFAULT 0,
  size text NOT NULL,
  style_id integar NOT NULL REFERENCES styles,
  UNIQUE (sku, style_id, size)
);

DROP TABLE related;
CREATE TABLE related (
  related_product_id GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  related_id integar REFERENCES products,
  product_id integar NOT NULL REFERENCES products,
  CONSTRAINT related_product_diff CHECK (related_id !== product_id)
);

client.end();
