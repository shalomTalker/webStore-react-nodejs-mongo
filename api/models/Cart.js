const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const cartModel = new Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    created: {
        type: String,
        required: false,
        default:new Date(Date.now())
    },
    products: {
        type: Array,
        required: true
    }
});


const Cart = mongoose.model('cart', cartModel)

module.exports = Cart;