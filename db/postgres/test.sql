
     /*EXPLAIN ANALYZE SELECT
      CAST (s.product_id AS text),
      COALESCE (
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'style_id', s.style_id,
            'name', style_name,
            'original_price', CAST (original_price AS text),
            'sale_price', CAST (sale_price AS text),
            'default?', default_style,
            'photos', phObj.photos,
            'skus', skObj.skus
          ) ORDER BY s.style_id
        ) FILTER (WHERE s.style_id IS NOT NULL), '{}') AS results
    FROM
      styles s
    LEFT JOIN (
      SELECT
        ph.style_id,
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'thumbnail_url', thumbnail_url,
              'url', photo_url
            )
          ) AS photos
      FROM photos ph
      GROUP BY ph.style_id
    ) AS phObj ON phObj.style_id = s.style_id
    INNER JOIN(
      SELECT
        sk.style_id,
        COALESCE(
          JSON_OBJECT_AGG(
            sk.sku,
            JSON_BUILD_OBJECT(
              'quantity', sk.quantity,
              'size', sk.size
            )
          ) FILTER (WHERE sk.style_id IS NOT NULL), '{}') AS skus
      FROM skus sk
      GROUP BY sk.style_id
    ) AS skObj ON skObj.style_id = s.style_id
    WHERE s.product_id = 65738
    GROUP BY s.product_id;*/


 /*EXPLAIN ANALYZE SELECT product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price FROM products ORDER BY id ASC LIMIT 5 OFFSET (0);*/

   /*EXPLAIN ANALYZE SELECT
      p.product_id AS id,
      product_name AS "name",
      slogan,
      product_description AS "description",
      category,
      default_price,
      ARRAY_AGG(
        JSONB_BUILD_OBJECT(
          'feature', feature_name,
          'value', feature_value
        )
      ) AS features
    FROM products p
    LEFT JOIN features f USING(product_id)
    WHERE product_id = 65738
    GROUP BY product_id;*/