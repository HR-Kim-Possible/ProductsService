CREATE INDEX idx_products_id
ON products(product_id);

CREATE INDEX idx_styles_product
ON styles(product_id);

CREATE INDEX idx_styles_id
ON styles(style_id);

CREATE INDEX idx_features_product
ON features(product_id);

CREATE INDEX photos_style
ON photos(style_id);

CREATE INDEX photos_photos
ON photos(photo_)

CREATE INDEX idx_skus_style
ON skus(style_id);

CREATE INDEX idx_styles_org_price ON styles(original_price DESC);