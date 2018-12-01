const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Order = require('../models/Order.js')
const Cart = require('../models/Cart.js')
const User = require('../models/User.js')
const Emailer = require('../helpers/Emailer')

const fs = require('fs');
let ejs = require('ejs-html')
// const ejs = require('ejs')
const path = require('path')



module.exports = {

    addToCart: async (req, res) => {
        try {
            const userId = req.params.userId
            const newProduct = Object.assign({ added_id: new ObjectId() }, req.body)

            const updatedCart = await Cart.findOneAndUpdate(
                { "user_id": userId },
                { $push: { products: newProduct } }, { new: true });
            res.status(200).json({ updatedCart })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    increaseToCart: async (req, res) => {
        try {
            const userId = req.params.userId
            const recievedProduct = req.body
            const cart = await Cart.findOne({ "user_id": userId })
            const [...products] = cart.products;
            const updatedProducts = products.map(prod => {
                if (prod.added_id == recievedProduct.added_id) {
                    const quantity = new Number(prod.quantity)
                    const recievedQuantity = quantity + Number(recievedProduct.quantity)
                    prod.quantity = recievedQuantity;
                }
                return prod
            })
            const updatedCart = await Cart.findOneAndUpdate({ "user_id": userId }, { $set: { products: updatedProducts } }, { new: true })
            console.log(updatedProducts/* , filteredProd */)
            const filteredProd = products.find(prod => (prod.added_id == recievedProduct.added_id))
            res.status(200).json({ updatedCart, updatedProduct: filteredProd })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            const userId = req.params.userId
            const prodId = req.body.prodId
            const cart = await Cart.findOne({ "user_id": userId })
            const [...products] = cart.products
            const updatedProduct = products.filter(prod => (prod.added_id != prodId))
            const filteredProd = products.find(prod => (prod.added_id == prodId))
            console.log(filteredProd)
            const updatedCart = await Cart.findOneAndUpdate({ "user_id": userId }, { $set: { products: updatedProduct } }, { new: true })
            res.status(200).json({ updatedCart, updatedProduct: filteredProd })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    decreaseFromCart: async (req, res) => {
        try {
            const userId = req.params.userId
            const prodId = req.body.prodId
            const cart = await Cart.findOne({ "user_id": userId })
            const [...products] = cart.products
            const updatedProducts = products.map(prod => {
                console.log(prodId, prod.added_id)
                if (prod.added_id == prodId) {
                    prod.quantity--
                }
                return prod
            })
            const filteredProd = products.find(prod => (prod.added_id == prodId))
            console.log(filteredProd)
            const updatedCart = await Cart.findOneAndUpdate({ "user_id": userId }, { $set: { products: updatedProducts } }, { new: true })
            res.status(200).json({ updatedCart, updatedProduct: filteredProd })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    placeOrder: async (req, res) => {
        try {
            console.log('req.value', req.value.body)
            const { city, street, shippingDate, cardNumber, cardExpiry, cardCVC } = req.value.body

            const { userId, cartId } = req.params
            const user = await User.findById(userId)
            const cart = await Cart.findById(cartId)
            console.log(typeof cardNumber)

            const totalPrice = cart.products.reduce((acc, cur) => (acc + Number(cur.price * cur.quantity)), 0)
            const verifyPayment = Number(String(cardNumber).substring(12))

            const newOrder = new Order({
                user_id: new ObjectId(userId),
                city,
                street,
                shippedAt: new Date(shippingDate).toLocaleDateString(),
                totalPrice: totalPrice.toFixed(2),
                verifyPayment,
                products: cart.products
            })
            await newOrder.save()

            await Cart.findOneAndRemove({ user_id: userId })
            const newCart = new Cart({
                user_id: new ObjectId(userId),
                createdAt: new Date(Date.now()),
                products: []
            })
            await newCart.save()

            const tempPath = path.join(__dirname, '../', 'views', 'reciept', 'index.ejs')
            const tempEjs = fs.readFileSync(tempPath, 'utf-8');
            const tempHtml = ejs.render(tempEjs, { user, order: newOrder }, {
                vars: ['user', 'order']
            })
            const transporter = await Emailer.initTransport('shalom604@gmail.com', 'shalom6Z', 'gmail')

            await Emailer.sendEmail(
                tempHtml,
                {
                    from: '<webStore@online.com>',
                    to: user.email,
                    subject: `reciept for order id:${newOrder._id}`
                }, transporter)
            fs.writeFileSync(path.join(__dirname, '../', 'uploads', 'bills', [newOrder._id] + '.html'), tempHtml, 'utf-8')
            const pathBill = path.join('uploads', 'bills', [newOrder._id] + '.html')

            res.status(200).json({ newCart, orderId: newOrder._id, pathBill })
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error })
        }

    }

};
