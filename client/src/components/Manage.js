import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import * as dataActions from '../actions/dataActions'


import CategoryNav from './CategoryNav'
import Products from './Products'
import ProductsBoard from './ProductsBoard'
import CartBoard from './CartBoard'
import DragLine from './DragLine'
import ProductDetails from './ProductDetails'
import ProductForm from './ProductForm'
import BtnActions from './BtnActions'
import StoreInfo from './StoreInfo'

import PropTypes from "prop-types"

Route.propTypes = {
    path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    render: PropTypes.func
}
class Manage extends Component {
    constructor(props) {
        super(props);
        this.pathname = props.location.pathname

    }
    componentWillMount = async () => {
        if (this.props.isAuthenticated) {
            await this.props.InitDataUser(this.props.token)
            await this.props.InitDataStore(this.props.token)

        } else {
            this.props.history.push('/signin')
        }
        if (this.props.logedinUser.role === 'user') {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div id="split_view" className="row">

                <div id="left_panel" className="col s12 m6">
                    <div id="wrapper">
                        <Switch>
                            <Route
                                key="storeDetails"
                                exact path={`/manage`}
                                render={(props) => (<StoreInfo {...props} />)} />
                            <Route
                                key="productDetails"
                                exact path={`/manage/details/`}
                                render={(props) => (<ProductDetails {...props} />)} />
                            <Route
                                key="actions"
                                path={["/manage/add", "/manage/edit"]}
                                render={(props) => (<ProductForm {...props} />)} />
                        </Switch>
                        <div>
                            <BtnActions {...this.props} />
                        </div>
                    </div>
                </div>
                <DragLine />

                <div id="right_panel" className="col s12 m6">
                    <CategoryNav route="manage" />
                    <ProductsBoard >
                        <Switch>
                            <Route
                                key="All"
                                path={["/manage", "/manage/details"]}
                                render={(props) => (<Products {...props} />)} />
                            {
                                this.props.categories.map(({ _id }) => {
                                    return (
                                        <Route
                                            key={_id}
                                            exact path={`/manage/details/?categoryId`}
                                            render={(props) => (<Products {...props} />)} />
                                    )
                                })
                            }
                        </Switch>
                    </ProductsBoard>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.data.categories,
        selectedProduct: state.data.selectedProduct,
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        logedinUser: state.data.logedinUser
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
export default connect(mapStateToProps, mapDispatchToProps)(Manage) 
