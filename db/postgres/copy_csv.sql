
COPY products
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/products.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY styles
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/styles.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY features
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/features.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY photos
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/photos3.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY skus
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/skus.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY related
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/related.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);



