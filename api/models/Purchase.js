const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseModel = new Schema({
    clientId: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true
    },
    shipAddress: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
    },
    shipped: {
        type: Date,
        required: false,
        default: new Date(Date.now())
    },
    ordered: {
        type: Date,
        required: true
    },
    verifyPayment: {
        type: Number,
        required: true
    },
});


const Purchase = mongoose.model('purchase', purchaseModel)

module.exports = Purchase;