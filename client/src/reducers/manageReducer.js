import { INIT_SELECED_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT } from '../actions/types'

const initialState = {
    selectedProduct: {},
    addedRecently:{},
    editedRecently:{}
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case INIT_SELECED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                addedRecently: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                editedRecently: action.payload
            }
        default:
            return state
    }
}