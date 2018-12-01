import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const jwtToken = JSON.parse(localStorage.getItem('JWT_TOKEN'));
const products = JSON.parse(localStorage.getItem('PRODUCTS'));
const orders = JSON.parse(localStorage.getItem('ORDERS'));
const categories = JSON.parse(localStorage.getItem('CATEGORIES'));
const logedinUser = JSON.parse(localStorage.getItem('ACTIVE_USER'));
const cart = JSON.parse(localStorage.getItem('CART'));

const selectedProduct = JSON.parse(localStorage.getItem('SELECTED_PRODUCT'));
const addedRecently = JSON.parse(localStorage.getItem('ADDED_RECENTLY'));
const editedRecently = JSON.parse(localStorage.getItem('EDITED_RECENTLY'));

const addedToCartRecently = JSON.parse(localStorage.getItem('ADDED_TO_CART_RECENTLY'));
const removedFromCartRecently = JSON.parse(localStorage.getItem('REMOVED_FROM_CART_RECENTLY'));
const initialState = {
    auth: {
        token: jwtToken,
        isAuthenticated: jwtToken ? true : false,

    },
    data: {
        products,
        orders,
        categories,
        logedinUser,
        cart
    },
    manage: {
        selectedProduct,
        addedRecently,
        editedRecently
    },
    users: {
        addedToCartRecently,
        removedFromCartRecently
    }
};

const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store;
