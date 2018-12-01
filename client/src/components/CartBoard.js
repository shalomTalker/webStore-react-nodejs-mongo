import React, { Component } from 'react'
import { connect } from 'react-redux'

import FullCart from './FullCart';
import EmptyCart from './EmptyCart';
class CartBoard extends Component {
    render() {
        return (
            <div className="row">
                <div className="collection">
                    {
                        (this.props.cart.products.length !== 0) ? (<FullCart{...this.props} />) : (<EmptyCart />)
                    }
                    {
                        (this.props.addedToCartRecently && this.props.cart.products.length !== 0) &&
                        (<p>{
                            `added recently: ${this.props.addedToCartRecently.name}
                        quantity: ${this.props.addedToCartRecently.quantity}
                        price: ${this.props.addedToCartRecently.price} / 1 unit
                        `
                        }</p>)

                    }
                    {
                        (this.props.removedFromCartRecently && this.props.cart.products.length !== 0) &&
                        (<p>{
                            `removed recently: ${this.props.removedFromCartRecently.name}
                        price: ${this.props.removedFromCartRecently.price} / 1 unit
                        `
                        }</p>)
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        addedToCartRecently: state.users.addedToCartRecently,
        removedFromCartRecently: state.users.removedFromCartRecently,
        cart: state.data.cart
    }
}
export default connect(mapStateToProps, null)(CartBoard)
