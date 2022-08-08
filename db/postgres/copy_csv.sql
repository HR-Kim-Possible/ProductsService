COPY styles
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/styles.csv'
WITH (
  DELIMITER ',',
  FORMAT CSV,
  HEADER true,
  NULL "null"
);

COPY photos
FROM '/Users/carolinepeake/HackReactor/SDC/Products_data/photos3.csv' DELIMITER ',' CSV
HEADER;

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



