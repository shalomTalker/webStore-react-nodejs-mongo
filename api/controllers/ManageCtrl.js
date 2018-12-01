var Product = require('../models/Product.js')
var Purchase = require('../models/Purchase.js')
var Category = require('../models/Category.js')
var Order = require('../models/Order.js')
var User = require('../models/User.js')
var Cart = require('../models/Cart.js')
var Category = require('../models/Category.js')

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const fs = require('fs');
const path = require('path')



module.exports = {
    addProduct: async (req, res) => {
        
        console.log("first fetch", req.body, req.file)
        let { name, category_id, price, image } = req.body
        try {
            
            const category = await Category.findById(category_id)
            fs.writeFileSync(`${__dirname}/../public/docs/img${category.pathName}/${name}.${req.file.mimetype.split('/')[1]}`);
            fs.renameSync(req.file.path, `${__dirname}/../public/docs/img${category.pathName}/${name}.${req.file.mimetype.split('/')[1]}`);
            image = `docs/img${category.pathName}/${req.body.name}.${req.file.mimetype.split('/')[1]}`;
            console.log(req.body);
            
            const newProd = new Product({ 
                name, 
                category_id: new ObjectId(category_id), 
                price, 
                image })
                await newProd.save()
                console.log('newProd._id', newProd._id)
                res.status(201).json({newProd})
            } catch (error) {
                console.log(error)
            }
        },
        editProduct: async (req, res) => {
            console.log("first fetch", req.body, req.file, req.files)
            let { name, category_id,product_id, price, image } = req.body
            if (req.file) {
                const category = await Category.findById(category_id)
                fs.writeFileSync(`${__dirname}/../public/docs/img${category.pathName}/${name}.${req.file.mimetype.split('/')[1]}`);
                
                fs.renameSync(req.file.path, `${__dirname}/../public/docs/img${category.pathName}/${name}.${req.file.mimetype.split('/')[1]}`);
                
                req.body.image = `docs/img${category.pathName}/${req.body.name}.${req.file.mimetype.split('/')[1]}`;
                console.log(req.body);
                
            }
            const {...product} = await Product.findById(product_id)
            console.log("product._doc", product._doc)
            const { ...updatedProd } = Object.assign(product._doc, req.body);
            console.log("updatedProd", updatedProd)
            await Product.update({_id:product_id}, updatedProd)
            
            res.status(201).json({ updatedProd})

            
        }
    };
