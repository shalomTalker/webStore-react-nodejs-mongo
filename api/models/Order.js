const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true
    },
    products: {
        type: Object,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    orderedAt: {
        type: Date,
        required: false,
        default: new Date(Date.now())
    },
    shippedAt: {
        type: String,
        required: true
    },
    verifyPayment: {
        type: Number,
        required: true
    },
});


const Order = mongoose.model('order', orderModel)

module.exports = Order;