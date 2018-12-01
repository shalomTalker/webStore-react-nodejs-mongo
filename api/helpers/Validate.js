const joi = require('joi');


module.exports = {
    validateBody: (schema) => {
        return async (req, res, next) => {
            try {
                console.log('req.body', req.body)
                const data = req.body
                console.log(data)
                const result = await joi.validate(data, schema)
                console.log(result)
                if (!req.value) { req.value = {} }
                req.value['body'] = result
                next()
            } catch (error) {
                console.log("error", error)
                res.status(403).json({ error: error.details[0].message })
            }

        }
    },
    schemas: {
        signInSchema: joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        }),
        signUpSchema: joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required(),
            id: joi.number().integer().positive().required(),
            password: joi.string().required(),
            confirmPassword: joi.string().required().valid(joi.ref('password')).options({
                language: {
                    any: {
                        allowOnly: '!!Passwords do not match',
                    }
                }
            }),
            city: joi.string().required(),
            street: joi.string().required()
        }),
        placeOrderSchema: joi.object({
            city: joi.string().required(),
            street: joi.string().required(),
            shippingDate: joi.date().required(),
            cardNumber: joi.number().integer().positive().required(),
            cardExpiry: joi.date().required(),
            cardCVC: joi.number().integer().positive().required()
        })
    }

}