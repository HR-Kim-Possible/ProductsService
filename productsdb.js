// MongoDB database

const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/productsdb`)
  .then(() => console.log('database connected'))

const { Schema } = mongoose;

const Products = new Schema({
  product_id: Number,
  product_name: String,
  slogan: String,
  product_description: String,
  category: String,
  default_price: Number
  features: {
    type: Map,
    of: String
  },
  styles: {
    type: subSchema,
    default: {}
  }
  related: {
    type: subSchema,
    default: []
  }
});

const styles = new Schema({
  style_id: Number,
  style_name: String,
  original_price: Number,
  sale_price: Number,
  default_selected: {type: Boolean, default: false },
  photos: [ { thumbnail_url: String, photo_url: String } ],
  skus: {
    type: Map,
    of: { size: String, quantity: Number }
  },
})

const related = new Schema({
  related_id: [Number]
})

const Product = mongoose.model('Product', Products);