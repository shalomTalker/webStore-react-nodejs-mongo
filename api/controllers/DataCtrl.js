var Product = require('../models/Product.js')
var Order = require('../models/Order.js')
var Category = require('../models/Category.js')
var Order = require('../models/Order.js')
var User = require('../models/User.js')
var Cart = require('../models/Cart.js')

const fs = require('fs');
const path = require('path')



module.exports = {
    getProducts: async (req, res) => {
        const products = await Product.find()
        res.status(200).json({ products })
    },
    getOrders: async (req, res) => {
        const orders = await Order.find()
        res.status(200).json({ orders })

    },
    getCategories: async (req, res) => {
        const categories = await Category.find()
        res.status(200).json({ categories })
    },
    getOrders: async (req, res) => {
        const orders = await Order.find()
        res.status(200).json({ orders })
    },
    getUser: async (req, res) => {
        const user = await User.findById(req.user._id)
        res.status(200).json({ user })

    },
    getCart: async (req, res) => {
        try {
            const userId = req.user._id
            const cart = await Cart.find({ user_id: userId })
            res.status(200).json({ cart: cart[0] })
        } catch (error) {
            res.status(404).json({ message: error })
        }

    },
    getBillHtml: async (req, res) => {
        console.log(req.params)
        const html = await fs.readFileSync(path.join(__dirname, '../', 'uploads', 'bills', `${req.params.orderId}.html`),'utf-8')
        res.status(200).write( html )

    },
    getTakenDates: async (req, res) => {
      console.log(req.body)  
        Order.find({}, 'shippedAt'  , { multi: true }, (error, properties)=> {
            if (error) throw new Error(error)
            console.log(properties)
            const dates = {};
            const takenDatesArr= []

            for (var i = 0; i < properties.length; i++) {
                var date = properties[i].shippedAt;
                dates[date] = dates[date] ? dates[date] + 1 : 1;
                if (dates[date] >= 3) {
                    takenDatesArr.push(properties[i].shippedAt)
                }
            }
            res.status(200).json({ takenDatesArr })
            console.log(dates, takenDatesArr);
        })
    }
};
