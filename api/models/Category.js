const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoryModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    pathName: {
        type: String,
        required: true
    }
});


const Category = mongoose.model('category', categoryModel)

module.exports = Category;