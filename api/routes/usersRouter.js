const express = require('express')
const router = express.Router();
const UsersCtrl = require('../controllers/UsersCtrl.js')
const DataCtrl = require('../controllers/DataCtrl.js')

const { validateBody, schemas } = require('../helpers/Validate.js')


router.route('/cart/add/:userId')
    .post(UsersCtrl.addToCart)

router.route('/cart/:userId/increase/')
    .post(UsersCtrl.increaseToCart)
    
router.route('/cart/delete/:userId')
    .delete(UsersCtrl.deleteFromCart)

router.route('/cart/decrease/:userId')
    .delete(UsersCtrl.decreaseFromCart)

router.route('/cart/:cartId/order/:userId')
    .post(validateBody(schemas.placeOrderSchema), UsersCtrl.placeOrder)




module.exports = router;