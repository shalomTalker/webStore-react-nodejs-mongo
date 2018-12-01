import React from 'react';
import { connect } from 'react-redux'


import { Link } from 'react-router-dom'


const UserInfo = (props) => {
    let content = (props.cart && props.logedinUser) &&
        (
            <div className="col s12 m6">
                <h5 className="header">Hi {props.logedinUser.firstName}, welcome {(props.cart.products.length !== 0) && 'back'} to your shopping area</h5>
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            {
                                (props.cart.products.length !== 0) ?
                                    (<p>We've detected that you have an active cart</p>) :
                                    (<p>We have detected that you have not yet made purchases on our site.
                                    You are welcome to check out our products</p>)

                            }
                        </div>
                        <div className="card-action">
                            <Link to="/dashboard">Continue shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    return (<div>
        {content}
    </div>)
}
function mapStateToProps(state) {
    return {
        cart: state.data.cart,
        logedinUser: state.data.logedinUser

    }
}
export default connect(mapStateToProps, null)(UserInfo)


