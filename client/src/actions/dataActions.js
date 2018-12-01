import { INIT_PRODUCTS, INIT_CATEGORIES, INIT_ORDERS, INIT_DATA_CART_USER, INIT_DATA_USER } from './types'
import axios from 'axios';



export const initDataUser = token => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/data/user/`, { headers: { Authorization: token}})
        localStorage.setItem('ACTIVE_USER', JSON.stringify(res.data.user))

        dispatch({
            type: INIT_DATA_USER,
            payload: res.data.user
        })
    } catch (error) {
        console.error(error)
    }
}

export const initDataCartUser = token => async dispatch => {
       try {
           const res = await axios.get(`http://localhost:5000/data/cart/`, { headers: { Authorization: token } })
           console.log(res.data)
           localStorage.setItem('CART', JSON.stringify(res.data.cart))
           dispatch({
               type: INIT_DATA_CART_USER,
               payload: res.data.cart
           })
       } catch (error) {
           console.error(error)
       }

}

export const initDataProducts = token => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/data/products/`, { headers: { Authorization: token}})
        localStorage.setItem('PRODUCTS', JSON.stringify(res.data.products))
        dispatch({
            type: INIT_PRODUCTS,
            payload: res.data.products
        })
    } catch (error) {
        console.error(error)
    }

}
export const initDataOrders = token => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/data/orders`, { headers: { Authorization: token}})
        localStorage.setItem('ORDERS', JSON.stringify(res.data.orders))
        dispatch({
            type: INIT_ORDERS,
            payload: res.data.orders
        })
    } catch (error) {
        console.error(error)
    }

}
export const initDataCategories = token => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/data/categories/`, { headers: { Authorization: token}})
        localStorage.setItem('CATEGORIES', JSON.stringify(res.data.categories))
        dispatch({
            type: INIT_CATEGORIES,
            payload: res.data.categories
        })
    } catch (error) {
        console.error(error)
    }
}

