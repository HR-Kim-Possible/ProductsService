

103965
11085

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
    WHERE s.product_id = 1
    GROUP BY s.product_id;*/

