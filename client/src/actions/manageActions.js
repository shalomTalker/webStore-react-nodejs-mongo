import {
    INIT_SELECED_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, WRITE_NOTIFY } from './types'
import axios from 'axios'

export const initSelectedProduct = prod => dispatch => {
    console.log(prod)
    localStorage.setItem('SELECTED_PRODUCT', JSON.stringify(prod))
    dispatch({
        type: INIT_SELECED_PRODUCT,
        payload: prod
    });
}
export const addProduct = (url, data) => async dispatch => {
    const res = await axios.post(`http://localhost:5000${url}`, data)
    console.log(res)
    localStorage.setItem('ADDED_RECENTLY', JSON.stringify(res.data.newProd))
    dispatch({
        type: ADD_PRODUCT,
        payload: res.data.newProd
    });
    dispatch({
        type: WRITE_NOTIFY,
        payload: 'your product has been added successfully'
    })
    localStorage.setItem('SELECTED_PRODUCT', JSON.stringify(res.data.newProd))
    dispatch({
        type: INIT_SELECED_PRODUCT,
        payload: res.data.newProd
    });
}
export const editProduct = (url, data) => async dispatch => {
    console.log(data)
    const res = await axios.post(`http://localhost:5000${url}`, data)
    console.log(res.data.updatedProd)
    localStorage.setItem('EDITED_RECENTLY', JSON.stringify(res.data.updatedProd));
    dispatch({
        type: EDIT_PRODUCT,
        payload: res.data.updatedProd
    });
    dispatch({
        type: WRITE_NOTIFY,
        payload: 'your product has been editted successfully'
    })
}