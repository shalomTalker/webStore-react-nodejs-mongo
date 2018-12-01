const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});


const Product = mongoose.model('product', productModel)

module.exports = Product;