
    /* `SELECT
      json_build_object(
      'product_id', to_json(styles.product_id),
      'results', json_build_array(
        json_build_object(
        'style_id', to_json(styles.style_id),
        'name', to_json(styles.name),
        'original_price', to_json(styles.original_price),
        'asker_name', to_json(questions.asker_name),
        'question_helpfulness', to_json(questions.question_helpfulness),
        'reported', to_json(questions.reported),
        'answers', json_build_object(
          answers.answer_id, json_build_object (
            'id', to_json(answers.answer_id),
            'body', to_json(answers.answer_body),
          'date', to_json(answers.answer_date),
          'answerer_name', to_json(answers.answerer_name),
          'helpfulness', to_json(answers.answer_helpfulness),
          'photos', json_build_array(
            json_build_object (
              'id', to_json(answer_photos.photo_id),
            'url', to_json(answer_photos.url)
              )
            )
            )
          )
        )
        )
      )
    FROM questions, answers, answer_photos
    WHERE questions.product_id = ${productId}
      AND answers.question_id = questions.question_id
      AND answers.answer_id = answer_photos.answer_id`
    )*/

    /*SELECT
        'product_id', '65738',
        'results', JSON_BUILD_ARRAY(
           JSON_BUILD_OBJECT(
            'style_id', TO_JSON(s.style_id),
            'name', TO_JSON(s.style_name),
            'original_price', TO_JSON(s.original_price),
            'sale_price', TO_JSON(s.sale_price),
            'default?', TO_JSON(s.default_style),
            'photos', JSON_BUILD_ARRAY(
              JSON_BUILD_OBJECT(
                'thumbnail_url', TO_JSON(ph.thumbnail_url),
                'url', TO_JSON(ph.photo_url)
              )
            ),
            'skus', JSON_BUILD_OBJECT(
              sk.sku, JSON_BUILD_OBJECT(
                'quantity', TO_JSON(sk.quantity),
                'size', TO_JSON(sk.size)
              )
            )
           )
        )
    FROM
      styles s, photos ph, skus sk
    WHERE s.product_id = 65738
     AND ph.style_id = s.style_id
     AND sk.style_id = s.style_id;*/


    /*SELECT
      'product_id', TO_JSON(65738),
      'results', JSON_BUILD_ARRAY(
        JSON_BUILD_OBJECT(
          'style_id', TO_JSON(s.style_id),
          'name', TO_JSON(s.style_name),
          'original_price', TO_JSON(CAST (s.original_price AS TEXT)),
          'sale_price', TO_JSON(CAST (s.sale_price AS TEXT)),
          'default?', TO_JSON(s.default_style),
          'photos', JSON_BUILD_ARRAY(
            JSON_BUILD_OBJECT(
              'thumbnail_url', TO_JSON(ph.thumbnail_url),
              'url', TO_JSON(ph.photo_url)
            )
          ),
          'skus', JSON_BUILD_OBJECT(
            sk.sku, JSON_BUILD_OBJECT(
              'quantity', TO_JSON(sk.quantity),
              'size', TO_JSON(sk.size)
            )
          )
        )
      )
  FROM
    styles s, photos ph, skus sk
  WHERE s.product_id = 65738;*/


     /* photos is an array of objects - maybe that;s my mistake*/


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

    /*DELETE FROM link_group lg
WHERE  NOT EXISTS (
   SELECT FROM link_reply lr
   WHERE  lr.which_group = lg.link_group_id
   );*/

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
    FROM photos ph, skus sk
    WHERE s.product_id = 65738
      AND ph.style_id = s.style_id
      AND sk.style_id = s.style_id
    GROUP BY s.product_id;*/


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
        ph.product_id,
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'thumbnail_url', thumbnail_url,
              'url', photo_url
            )
          ) AS photos
      FROM photos ph, products p
      GROUP BY ph.style_id, p.product_id
    ) AS phObj ON phObj.style_id = s.style_id AND phObj.product_id = p.product_id
    WHERE ph.styles_id IN (SELECT * FROM styles WHERE product_id = 65738) AND photos.product_id (select * FROM products WHERE product_id = 65738)
    LEFT JOIN(
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
    FROM photos ph, skus sk, products p, styles s
    WHERE s.product_id = 65738
      AND ph.style_id = s.style_id
      AND sk.style_id = s.style_id
      AND ph.product_id = 65738
      AND ph.product_id = s.product_id
    GROUP BY s.product_id;*/

    EXPLAIN ANALYZE SELECT
      JSON_BUILD_OBJECT(
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
        ) FILTER (WHERE s.style_id IS NOT NULL), '{}') AS results)
    FROM
      (select styles s
    LEFT JOIN (
      SELECT
        ph.style_id,
        ph.product_id,
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'thumbnail_url', thumbnail_url,
              'url', photo_url
            )
          ) AS photos
      FROM photos ph, products p
      GROUP BY ph.style_id, p.product_id
    ) AS phObj ON phObj.style_id = s.style_id AND phObj.product_id = p.product_id
    WHERE ph.styles_id IN (SELECT * FROM styles WHERE product_id = 65738) AND photos.product_id (select * FROM products WHERE product_id = 65738)
    LEFT JOIN(
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
    FROM photos ph, skus sk, products p, styles s
    WHERE s.product_id = 65738
      AND ph.style_id = s.style_id
      AND sk.style_id = s.style_id
      AND ph.product_id = 65738
      AND ph.product_id = s.product_id
    GROUP BY s.product_id;


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