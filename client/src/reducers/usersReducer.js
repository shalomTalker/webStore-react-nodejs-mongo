import { ADD_TO_CART, DELETE_FROM_CART, BILL_ACCEPTED } from '../actions/types'

const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                addedToCartRecently: action.payload
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                removedFromCartRecently: action.payload
            }
        case BILL_ACCEPTED:
            return {
                ...state,
                orderId: action.payload
            }
        default:
            return state
    }
}
