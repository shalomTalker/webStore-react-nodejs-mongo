import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomForm from './CustomForm'
import { cartSearchForm } from './inputsModel'
import { CLEAR_FORM } from '../actions/types'
import Highlighter from "react-highlight-words";

const FullCart = (props) => {
    const pathname = props.location.pathname;
    const total = props.cart.products.reduce((acc, cur) => acc + Number(cur.price * cur.quantity), 0)
    const quantity = props.cart.products.reduce((acc, cur) => (Number(acc) + Number(cur.quantity)), 0);
    const matches = (props.form !== undefined)?  (props.form.split(' ').map(word => word)): [""] ;
    const content = props.cart.products.map(prod => {
        return (
            <li key={prod.added_id} className="collection-item avatar">
                <img src={prod.image} alt={prod.name} className="circle" />
                <span className="search title" >Name:
                    <Highlighter
                        highlightClassName="yellow"
                        searchWords={matches}
                        textToHighlight={prod.name}/></span>
                <span className="search quantity" > Quantity:
                    <Highlighter
                        highlightClassName="yellow"
                        searchWords={matches}
                        textToHighlight={prod.quantity.toString()}/></span>
                <span className="search price" >Price:
                    <Highlighter
                        highlightClassName="yellow"
                        searchWords={matches}
                        textToHighlight={(prod.price * prod.quantity).toFixed(2).toString()}/></span>
                {
                    (pathname !== '/dashboard/order') &&
                    (<button
                        onClick={() => props.handleClick(prod.added_id)}
                        className="btn-floating waves-effect waves-light red">
                        <i className="material-icons">clear</i>
                    </button>)}
            </li>
        )
    });

    return (
        <div>
            <div className="center-align">
                <h4>
                    {
                        (pathname === '/dashboard/order')
                            ? 'Bill Order'
                            : 'Shopping Cart'
                    } <span>({`${quantity} Products`})</span>
                </h4>
            </div>
            <div className="row">
                <CustomForm
                    onsubmit={(e) => { e.preventDefault() }}
                    classcss="input-field col s6"
                    model={cartSearchForm}
                    btnSubmit={false}>
                </CustomForm>
            </div>
            <div className="col s12 ">
                {content}
            </div>
            <footer>
                {
                    (pathname === '/dashboard/order')
                        ? <Link to='/dashboard'>Back To Shop</Link>
                        : <Link to='/dashboard/order'>To Order</Link>
                }
                <h5>{`Total-Price: ${total.toFixed(2)}$`}</h5>
            </footer>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cart: state.data.cart,
        form: state.form.cartSearch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearForm: () => {
            dispatch({
                type: CLEAR_FORM
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FullCart)
