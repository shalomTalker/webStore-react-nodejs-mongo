import { AUTH_SIGN_UP, WRITE_ERROR, CLEAR_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN } from './types'
import axios from 'axios'

export const signUp = data => async dispatch => {
    console.log(data)
    try {
        const res = await axios.post('http://localhost:5000/signup', data)
        await dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        })
        localStorage.setItem('JWT_TOKEN', JSON.stringify(res.data.token))
        dispatch({
            type: CLEAR_ERROR,
            payload: ''
        })
    } catch (err) {
        dispatch({
            type: WRITE_ERROR,
            payload: err.response.data.error
        })
        
    }
}
export const signIn = data => async dispatch => {
    console.log(data);
    try {
        const res = await axios.post('http://localhost:5000/signin', data)
        await dispatch({
            type: AUTH_SIGN_IN,
            payload: res.data.token
        })
        localStorage.setItem('JWT_TOKEN', JSON.stringify(res.data.token))
        dispatch({
            type: CLEAR_ERROR,
            payload: ''
        })
    } catch (err) {
        dispatch({
            type: WRITE_ERROR,
            payload: 'Email or Password are not correct , Please try again'
        })
        
    }

}
export const signOut = () => dispatch => {
    localStorage.removeItem('JWT_TOKEN')
    localStorage.removeItem('PRODUCTS')
    localStorage.removeItem('ACTIVE_USER')
    localStorage.removeItem('CATEGORIES')
    localStorage.removeItem('ORDERS')
    localStorage.removeItem('CART')
    localStorage.removeItem('RECIEPT')
    localStorage.removeItem('SELECTED_PRODUCT')
    localStorage.removeItem('ADDED_RECENTLY')
    localStorage.removeItem('EDITED_RECENTLY')
    localStorage.removeItem('ADDED_TO_CART_RECENTLY')
    localStorage.removeItem('REMOVED_FROM_CART_RECENTLY')
    dispatch({
        type: AUTH_SIGN_OUT,
        payload: ''
    })
}