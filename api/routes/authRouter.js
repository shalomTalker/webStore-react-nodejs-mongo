const express = require('express')
const router = express.Router();
const AuthCtrl = require('../controllers/AuthCtrl.js')
const { validateBody, schemas } = require('../helpers/Validate.js')
const passport = require('passport')
const passportConf = require('../passport.js');
const passportJWT = passport.authenticate('jwt', { session: false })
const passportSignin = passport.authenticate('local', { session: false })
// console.log(signUpSchema);

router.route('/signin')
    .post(validateBody(schemas.signInSchema), passportSignin, AuthCtrl.signIn)

router.route('/signup')
    .post(validateBody(schemas.signUpSchema), AuthCtrl.signUp)

router.route('/home')
    .get(passportJWT, AuthCtrl.home)

module.exports = router;