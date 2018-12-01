const express = require('express')
const router = express.Router();
const DataCtrl = require('../controllers/DataCtrl.js')

const passport = require('passport')
const passportConf = require('../passport.js');
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/data/products')
    .get(passportJWT,DataCtrl.getProducts)
    
router.route('/data/orders')
    .get(passportJWT,DataCtrl.getOrders)
    
router.route('/data/categories')
    .get(passportJWT,DataCtrl.getCategories)
    
router.route('/data/orders')
    .get(passportJWT,DataCtrl.getOrders)
    
router.route('/data/user/')
    .get(passportJWT, DataCtrl.getUser)
    
router.route('/data/cart/')
    .get(passportJWT, DataCtrl.getCart)
    
router.route('/data/:orderId/bill')
    .get(passportJWT,DataCtrl.getBillHtml)

router.route('/data/takenDates/dates')
    .get(passportJWT,DataCtrl.getTakenDates)

// router.route('/data/:userId')
//     .get(DataCtrl.getOne)

module.exports = router;