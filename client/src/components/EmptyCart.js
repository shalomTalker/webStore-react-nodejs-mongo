import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as UsersActions from '../actions/usersActions'



const EmptyCart = (props) => {

    return (
        <div>
            <div className="center-align">
                <h4>Your Shopping Cart</h4>
            </div>
            <div className="col s12 ">
                <h5 className="header center-align">Hi {props.logedinUser.firstName}, This is the area where the products you add to your shopping cart will be added</h5>
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <p>Start your shopping by navigating through categories and adding the product you want to your shopping cart</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
               footer
            </footer>
        </div>
    )

}
function mapStateToProps(state) {
    return {
        logedinUser: state.data.logedinUser
        }
}
export default connect(mapStateToProps, UsersActions)(EmptyCart)