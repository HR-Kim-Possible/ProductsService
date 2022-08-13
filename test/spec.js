/* eslint-disable no-undef */
const request = require('supertest')('http://localhost:6246');
const assert = require('assert');
const express = require('express');
const axios = require('axios');

// describe('Get Styles', () => {
//   test('Get all styles for product id 65738', () => (
//     request
//       .get('/products/65738/styles')
//       .expect(200)
//       .then((res) => {
//         const { body } = res;
        // const { results } = body;
        // const { rows } = results;
        // expect(body).toBe({"product_id":"65738","results":[{"style_id":129140,"name":"Purple","original_price":"607.00","sale_price":null,"default?":true,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1532244769164-ff64ddeefa45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}],"skus":{"743930":{"quantity":22,"size":"One Size"}}},{"style_id":129141,"name":"Cyan","original_price":"607.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1536181211993-cf4b2c100475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1523296357416-a4b3c4b9ee65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1519330377309-9ee1c6783348?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"}],"skus":{"743931":{"quantity":6,"size":"One Size"}}}]});
        // expect(body.product_id).toBe(65738);
        // expect(Array.isArray(results)).toBe(false);
        // expect(results.length > 0).toBe(true);
        // expect(typeof styles.style_id).toBe('number');
        // expect(typeof styles.style_name).toBe('string');
        // expect(typeof styles.sale_price_date).toBe('string');
        // expect(typeof styles.original_price).toBe('string');
        // expect(typeof styles.default?).toBe('boolean');
        // const { sku } = skus;
        // expect(results.skus === 'object').toBe(true);
        // Object.keys(sku).forEach((sku) => {
        //   expect(Number(sku)).not.toBe(NaN);
        // });
        // const amount = results[Object.keys(sku)[0][quantity]];
        // expect(typeof sku.quantity).toBe('number');
        // expect(typeof sku.size).toBe('string');
        // expect(Array.isArray(styles.photos)).toBe(true);
        // expect(styles.photos.length > 0 ).toBe(true);
    //   })
    // ))

  // test('Returns all styles for a product', () => {
  //   .get('/products/:product_id/styles')
  //   .expect(200)
  //   .then((res) => {
  //     const { body } = res;
  //     const { results } = body;
  //     expect(results.length).toBe(1);
  //   });
  // });
// });

describe('Get Product', () => {
  test('Get product info for product id 65738', () => (
    request
      .get('/products/65738')
      .expect(200)
      .then((res) => {
        const { body } = res;
        // const { results } = body;
        // const { rows } = results;
        expect(body).toStrictEqual({"id":65738,"name":"Gaston Cap","slogan":"Dolor est sunt cupiditate tempora dolores aliquam dolor et.","description":"Et a assumenda qui eos nostrum perspiciatis at debitis ut. Eius sapiente et ut fugit dolores et. Nostrum ut et quia et vel et quam velit autem. Praesentium placeat libero at voluptatum earum numquam. Eos et laborum earum.","category":"Cap","default_price":"607.00","features":[{"value":"Ivory","feature":"Buttons"}]});
        expect(body.id).toBe(65738);
      })
  ))
});

describe('Get Products', () => {
  test('Get all products with no parameters included', () => (
    request
      .get('/products')
      .expect(200)
      .then((res) => {
        const { body } = res;
        // const { results } = body;
        // const { rows } = results;
        expect(body).toStrictEqual([{"id":1,"name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00"},{"id":2,"name":"Bright Future Sunglasses","slogan":"You've got to wear shades","description":"Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.","category":"Accessories","default_price":"69.00"},{"id":3,"name":"Morning Joggers","slogan":"Make yourself a morning person","description":"Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.","category":"Pants","default_price":"40.00"},{"id":4,"name":"Slacker's Slacks","slogan":"Comfortable for everything, or nothing","description":"I'll tell you how great they are after I nap for a bit.","category":"Pants","default_price":"65.00"},{"id":5,"name":"Heir Force Ones","slogan":"A sneaker dynasty","description":"Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl","category":"Kicks","default_price":"99.00"}]);
      })
  ))
});
