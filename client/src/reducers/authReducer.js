import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN } from '../actions/types'

const initialState = {
    isAuthenticated: false,
    token: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SIGN_UP:
            return { 
                ...state,
                token: action.payload,
                isAuthenticated: true 
            }
        case AUTH_SIGN_OUT:
            return { 
                ...state,
                token: action.payload,
                isAuthenticated: false
            }
        case AUTH_SIGN_IN:
            return { 
                ...state,
                token: action.payload,
                isAuthenticated: true
            }
        default:
            return state
    }
}