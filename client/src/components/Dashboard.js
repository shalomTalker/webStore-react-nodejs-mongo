import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import CategoryNav from './CategoryNav'
import Products from './Products'
import ProductsBoard from './ProductsBoard'
import CartBoard from './CartBoard'
import DragLine from './DragLine'
import ConfirmOrder from './ConfirmOrder'


import * as dataActions from '../actions/dataActions'
import * as usersActions from '../actions/usersActions'
import * as dialogActions from '../actions/dialogActions'



class Dashboard extends Component {

  handleDeleteClick = async (prodId) => {
    const product = this.props.cart.products.find(prod=>prod.added_id === prodId)
    if (product.quantity == 1) {
      try {
        await this.props.deleteFromCart(prodId, this.props.logedinUser._id)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await this.props.decreaseFromCart(prodId, this.props.logedinUser._id)
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleAddClick = async () => {
    this.props.openDialog()
  }
  componentWillMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/signin')
    }
  }

  render() {
    return (
      <div id="split_view" className="row ">
        <div id="left_panel" className="col s12 m6">
          <CartBoard {...this.props} handleClick={this.handleDeleteClick} />
        </div>
        {
          (this.props.location.pathname === '/dashboard/order')
            ?
            (<div id="right_panel" className="col s12 m6">
              <ConfirmOrder{...this.props}/>
            </div>)
            :
            (<div id="right_panel" className="col s12 m6">
              <CategoryNav route="dashboard"/>
        <DragLine />
              <ProductsBoard >
                <Switch>
                  <Route
                    key="All"
                    path={`/dashboard/`}
                    render={(props) => (<Products handleClick={this.handleAddClick} {...props} />)} />
                  {
                    this.props.categories.map(({ _id }) => {
                      return (
                        <Route
                          key={_id}
                          path={`/dashboard/:category/?id`}
                          render={(props) => (<Products handleClick={this.handleAddClick} {...props} />)} />
                      )
                    })
                  }
                </Switch>
              </ProductsBoard>
            </div>)
        }
        
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    logedinUser: state.data.logedinUser,
    products: state.data.products,
    categories: state.data.categories,
    cart: state.data.cart
  }
}
const mapStateToDispatch = dispatch => {
  return {
    addToCart: (prod, userId) => {
      dispatch(usersActions.addToCart(prod, userId))
    },
    deleteFromCart: (prodId, userId) => {
      dispatch(usersActions.deleteFromCart(prodId, userId))
    },
    decreaseFromCart: (prodId, userId) => {
      dispatch(usersActions.decreaseFromCart(prodId, userId))
    },
    openDialog: () => {
      dispatch(dialogActions.openDialog())
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Dashboard)
