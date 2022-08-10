/* eslint-disable no-undef */
const request = require('supertest')('http://localhost:6246');

describe('Get Styles', () => {
  test('Get at least one style for a product', () => (
    request
      .get('/products/:product_id/styles')
      .expect(200)
      .then((res) => {
        const { body } = res;
        const { results } = body;
        expect(body.product_id).toBe('product_id');
        expect(Array.isArray(results)).toBe(false);
        expect(results.length > 0).toBe(true);
        const question = results[0];
        console.log(question);
        expect(typeof styles.style_id).toBe('number');
        expect(typeof styles.style_name).toBe('string');
        expect(typeof styles.sale_price_date).toBe('string');
        expect(typeof styles.original_price).toBe('string');
        expect(typeof styles.default?).toBe('boolean');
        const { sku } = skus;
        expect(!Array.isArray(sku) && typeof sku === 'object').toBe(true);
        Object.keys(sku).forEach((sku) => {
          expect(Number(sku)).not.toBe(NaN);
        });
        const amount = results[Object.keys(sku)[0][quantity]];
        expect(typeof sku.quantity).toBe('number');
        expect(typeof sku.size).toBe('string');
        expect(Array.isArray(styles.photos)).toBe(true);
        expect(styles.photos.length > 0 ).toBe(true);
      })
    ))

  test('Returns all styles for a product', () => {
    .get('/products/:product_id/styles')
    .expect(200)
    .then((res) => {
      const { body } = res;
      const { results } = body;
      expect(results.length).toBe(1);
    });
  });
});
