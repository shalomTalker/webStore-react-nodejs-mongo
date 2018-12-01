
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { quantityForm } from './inputsModel'

import CustomForm from './CustomForm'
import { CLEAR_FORM } from '../actions/types'

import * as usersActions from '../actions/usersActions'

class Quantity extends Component {
  componentWillMount = () => {
    if (!this.props.errorMessage) {
      this.props.clearForm()
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try {
      const existProduct = this.props.cart.products.find(prod => prod._id === this.props.location.params._id)
      const { ...selectedProd } = this.props.location.params
      const obj = (!existProduct) ? selectedProd : existProduct;
      console.log(obj, existProduct, selectedProd)
      const prod = Object.assign(obj, { quantity: this.props.form.quantity, price: this.props.location.params.price });
        (!existProduct) ?
        await this.props.addToCart(prod, this.props.logedinUser._id)
        :
        await this.props.increaseToCart(prod, this.props.logedinUser._id)

      if (!this.props.errorMessage) {
        this.props.clearForm()
        this.props.closeDialog()
      } else {
        this.props.history.push({
          pathname: '/dialog/error',
          state: { DialogisOpen: true },
          params: this.props.errorMessage
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div id="sign_up" className="row" >
        <h4 className="col s12">Choose Quantity</h4>
        <CustomForm
          btnSubmit={true}
          name="form"
          onsubmit={this.onSubmit}
          classcss="col s12 card-panel"
          model={quantityForm}
        >
        </CustomForm>
      </div>
    )
  }
}
const mapStateToProps = (state) => {  return {
    form: state.form,
    errorMessage: state.message.errorMessage,
    logedinUser: state.data.logedinUser,
    cart: state.data.cart
  }
}
const mapDispatchToProps = (dispatch) => {  return {
  addToCart: async (prod, userId) => {
    await dispatch(usersActions.addToCart(prod, userId))
    },
  increaseToCart: async (prod, userId) => {
    await dispatch(usersActions.increaseToCart(prod, userId))
    },
    clearForm: () => {
      dispatch({
        type: CLEAR_FORM
      })
    }
  }
}
export default
  connect(mapStateToProps, mapDispatchToProps)(Quantity)