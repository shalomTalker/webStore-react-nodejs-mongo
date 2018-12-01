const express = require('express')
const router = express.Router();
const ManageCtrl = require('../controllers/ManageCtrl.js')


router.route('/manage/add')
    .post(ManageCtrl.addProduct)

router.route('/manage/edit')
    .post(ManageCtrl.editProduct)



module.exports = router;