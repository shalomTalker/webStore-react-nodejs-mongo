import { INIT_DATA_USER, INIT_DATA_CART_USER, INIT_PRODUCTS, INIT_ORDERS, INIT_CATEGORIES } from '../actions/types'

const initialState = {
    logedinUser: {}, 
    products: [],
    orders: [],
    categories: [],
    cart:{}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_DATA_USER:
            return {
                ...state,
                logedinUser: action.payload
            }
        case INIT_DATA_CART_USER:
            return {
                ...state,
                cart: action.payload
            }
        case INIT_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case INIT_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case INIT_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
       
        default:
            return state
    }
}