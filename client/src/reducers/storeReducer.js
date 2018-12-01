import { DISPATCH_SEARCH_KEY } from '../actions/types'

const initialState = {
    searchKey: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload
            }
       

        default:
            return state
    }
}