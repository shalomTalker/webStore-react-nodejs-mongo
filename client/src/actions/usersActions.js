import { ADD_TO_CART, DELETE_FROM_CART, CLOSE_DIALOG, INIT_DATA_CART_USER, BILL_ACCEPTED, WRITE_ERROR, WRITE_NOTIFY } from './types'
import axios from 'axios'

export const addToCart = (prod, userId) => async dispatch => {
    console.log(prod, userId);

    const res = await axios.post(`http://localhost:5000/cart/add/${userId}`, prod)
    const [...products] = res.data.updatedCart.products
    const index = products.length - 1
    const added = products[index]

    localStorage.setItem('ADDED_TO_CART_RECENTLY', JSON.stringify(added))
    await dispatch({
        type: ADD_TO_CART,
        payload: added
    })
    localStorage.setItem('CART', JSON.stringify(res.data.updatedCart))
    
    await dispatch({
        type: INIT_DATA_CART_USER,
        payload: res.data.updatedCart
    })
    dispatch({
        type: CLOSE_DIALOG,
        payload: { ariaHide: false }
    });
    
}
export const increaseToCart = (prod, userId) => async dispatch => {
    console.log(prod, userId);
    const res = await axios.post(`http://localhost:5000/cart/${userId}/increase/`, prod)
    // const [...products] = res.data.updatedCart.products
    // const index = products.length - 1;
    // const added = products[index]

    localStorage.setItem('ADDED_TO_CART_RECENTLY', JSON.stringify(res.data.updatedProduct))
    await dispatch({
        type: ADD_TO_CART,
        payload: res.data.updatedProduct
    })
    localStorage.setItem('CART', JSON.stringify(res.data.updatedCart))

    await dispatch({
        type: INIT_DATA_CART_USER,
        payload: res.data.updatedCart
    })
    await dispatch({
        type: CLOSE_DIALOG,
        payload: { ariaHide: false }
    });

}
export const deleteFromCart = (prodId, userId) => async dispatch => {

    const res = await axios.delete(`http://localhost:5000/cart/delete/${userId}`, { data: { prodId } })
    console.log(res.data.updatedProduct)
        localStorage.setItem('REMOVED_FROM_CART_RECENTLY', JSON.stringify(res.data.updatedProduct))
    await dispatch({
        type: DELETE_FROM_CART,
        payload: res.data.updatedProduct
    })
    localStorage.setItem('CART', JSON.stringify(res.data.updatedCart))
    await dispatch({
        type: INIT_DATA_CART_USER,
        payload: res.data.updatedCart
    })

}
export const decreaseFromCart = (prodId, userId) => async dispatch => {

    const res = await axios.delete(`http://localhost:5000/cart/decrease/${userId}`, { data: { prodId } } )
    console.log(res.data.updatedProduct)
    localStorage.setItem('REMOVED_FROM_CART_RECENTLY', JSON.stringify(res.data.updatedProduct))
    await dispatch({
        type: DELETE_FROM_CART,
        payload: res.data.updatedProduct
    })
    localStorage.setItem('CART', JSON.stringify(res.data.updatedCart))
    await dispatch({
        type: INIT_DATA_CART_USER,
        payload: res.data.updatedCart
    })

}

export const placeOrder = ({ data, userId, cartId }) => async dispatch => {
    
    try {
        
        const res = await axios.post(`http://localhost:5000/cart/${cartId}/order/${userId}`,data )
        localStorage.setItem('CART', JSON.stringify(res.data.newCart))
        dispatch({
            type: BILL_ACCEPTED,
            payload: res.data.orderId
        })
        dispatch({
            type: WRITE_NOTIFY,
            payload: 'Your order has been received in the system and will be processed.'
        })


    } catch (error) {
        dispatch({
            type: WRITE_ERROR,
            payload: error.response.data.error
        })
    }

}
