import React from 'react';
import { connect } from 'react-redux'



const StoreInfo = (props) => {
    let content = (props.products&&props.orders) ?
        (
            <div className="col s12 m6 card-panel">
                <p>The amount of orders made on the site: {props.orders.length}</p>
                <p>The quantity of products available on the site: {props.products.length}</p>

            </div>
        ): null
    return (
        <div >
            <h4>about our store</h4>
            {content}
        </div>
    )
}
function mapStateToProps(state) {
    return {
        products: state.data.products,
        orders: state.data.orders

    }
}
export default connect(mapStateToProps, null)(StoreInfo)



