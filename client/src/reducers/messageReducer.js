import { WRITE_ERROR, WRITE_NOTIFY, CLEAR_ERROR } from '../actions/types'

const initialState = {
    errorMessage: "",
    notifyMessage: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case WRITE_ERROR:
        return {
            ...state,
            errorMessage: action.payload
        }
        case WRITE_NOTIFY:
            return {
                ...state,
                notifyMessage: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}