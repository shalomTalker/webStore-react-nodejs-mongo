import { emailRegex } from './regex'
import { cardNumberRegex } from './regex'
import { cardCVCRegex } from './regex'
export const addProdForm = [
    {
        required: true,
        type: "text",
        name: "name",
        label: "Name",
        isValid: val => (val) && val.length >= 2,
        errMsg: "name have to be 2 chracters minimum",
    },
    {
        required: true,
        type:"text",
        isValid: val => (val) && !isNaN(val),
        errMsg: "price have to be a number",
        name: "price",
        label: "Price"
    },
    {
        required: true,
        type: "file",
        name: "image",
        label: "Image"
    }
]
export const editProdForm = [
    {
        required: true,
        type: "text",
        name: "name",
        label: "Name",
        isValid: val => (val) && val.length >= 2,
        errMsg: "name have to be 2 chracters minimum",
    },
    {
        required: true,
        type: "text",
        isValid: val => (val) && !isNaN(val),
        errMsg: "price have to be a number",
        name: "price",
        label: "Price"
    },
    {
        required: false,
        type: "file",
        name: "image",
        label: "Image"
    }
]
export const productsSearchForm = [
    {
        required: true,
        type: "text",
        name: "productsSearch",
        label: "type search value...",
        icon: "search"
    }
]
export const cartSearchForm = [
    {
        required: false,
        type: "text",
        name: "cartSearch",
        label: "type search value...",
        icon: "search"
    }
]
export const quantityForm = [
    {
        required: true,
        type: "number",
        name: "quantity",
        isValid: val => (val) && val > 0,
        errMsg: "Quantity have to be 1 minimum",
        label: "Quantity"
    }
]
export const orderForm = [
    {
        required: true,
        type: "text",
        name: "city",
        isValid: val => (val) && val.length >= 2,
        errMsg: "City is not valid",
        label: "City"

    },
    {
        required: true,
        type: "text",
        name: "street",
        isValid: val => (val) && val.length >= 4,
        errMsg: "Street is not valid",
        label: "Street"

    },
    {
        required: true,
        type: "date-time",
        name: "shippingDate",
        isValid: val => (val) && new Date(val).getTime() > new Date().getTime() + (3 * 24 * 60 * 60 * 1000),
        errMsg: "Minimum delivery date is 3 days",
        label: "Shipping Date"
    },
    {
        required: true,
        type: "tel",
        name: "cardNumber",
        isValid: val => (val) && cardNumberRegex.exec(val),
        errMsg: "card Number have to be valid",
        label: "card number"
    },
    {
        required: true,
        type: "month",
        name: "cardExpiry",
        isValid: val => (val) && new Date(val) > new Date(Date.now()),
        errMsg: "this date is expired",
        label: "card expiry"
    },
    {
        required: true,
        type: "tel",
        name: "cardCVC",
        isValid: val => (val) && cardCVCRegex.exec(val),
        errMsg: "card CVC have to be valid",
        label: "CVC code"
    }
]
export const signinForm = [
    {
        required: true,
        type: "email",
        name: "email",
        isValid: val => (val) && emailRegex.exec(val),
        errMsg: "Email is not valid",
        label: "email"

    },
    {
        required: true,
        type: "password",
        name: "password",
        isValid: val => (val) && val.length >= 4,
        errMsg: "password min 4 digits",
        label: "password"

    }
]
export const signupForm = [
    {
        required: true,
        type: "text",
        name: "firstName",
        isValid: val => (val) && val.length >= 2,
        errMsg: "first name min 2 digits",
        label: "first name"

    },
    {
        required: true,
        type: "text",
        name: "lastName",
        isValid: val => (val) && val.length >= 2,
        errMsg: "last name min 2 digits",
        label: "last name"

    },
    {
        required: true,
        type: "password",
        name: "password",
        isValid: val => (val) && val.length >= 4,
        errMsg: "password min 4 digits",
        label: "password"

    },
    {
        required: true,
        type: "password",
        name: "confirmPassword",
        isValid: val => (val) && val.length >= 4,
        errMsg: "password min 4 digits",
        label: "confirm password"

    },
    {
        required: true,
        type: "email",
        name: "email",
        isValid: val => (val) && emailRegex.exec(val),
        errMsg: "Email is not valid",
        label: "email"

    },
    {
        required: true,
        type: "text",
        name: "id",
        isValid: val => (val) && val.length >= 9,
        errMsg: "id min 9 digits",
        label: "id"

    },
    {
        required: true,
        type: "text",
        name: "city",
        isValid: val => (val) && val.length >= 2,
        errMsg: "city min 2 digits",
        label: "city"

    },
    {
        required: true,
        type: "text",
        name: "street",
        isValid: val => (val) && val.length >= 2,
        errMsg: "street min 2 digits",
        label: "street"

    },
]