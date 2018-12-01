import React, { Component } from 'react'
import { connect } from 'react-redux'
// import jwtDecode from 'jwt-decode';
import * as dataActions from '../actions/dataActions'
import UserInfo from './UserInfo'
import StoreInfo from './StoreInfo'
import SharingCard from './SharingCard'


class Home extends Component {

    componentWillMount = async () => {
        if (this.props.isAuthenticated) {
            // const generateToken = await jwtDecode(this.props.token)
            await this.props.InitDataUser(this.props.token)
            await this.props.InitDataStore(this.props.token)
        } else {
            this.props.history.push('/signin')
        }
        if (this.props.logedinUser && this.props.logedinUser.role === 'manager') {
            this.props.history.push('/manage')
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <UserInfo />
                    <StoreInfo />
                </div>
                <div className="row">
                    <div className="row">
                        <SharingCard />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        logedinUser: state.data.logedinUser,
        products: state.data.products,
        orders: state.data.orders,
        cart: state.data.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        InitDataStore: async (token) => {
            await dispatch(dataActions.initDataOrders(token))
            await dispatch(dataActions.initDataProducts(token))
            await dispatch(dataActions.initDataCategories(token))
        },
        InitDataUser: async (token) => {
            await dispatch(dataActions.initDataUser(token))
            await dispatch(dataActions.initDataCartUser(token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)