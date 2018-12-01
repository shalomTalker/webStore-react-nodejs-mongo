import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { orderForm } from './inputsModel'
import datePicker from 'js-datepicker'

import { CLEAR_FORM, ON_INPUT } from '../actions/types'
import * as usersActions from '../actions/usersActions'

import CustomForm from './CustomForm'



class ConfirmOrder extends Component {

    componentWillMount = () => {
        if (!this.props.errorMessage) {
            this.props.clearForm()
        }
    }
    componentDidMount = async () => {
        const res = await axios.get(`http://localhost:5000/data/takenDates/dates`)
        const dateInput = datePicker('#shippingDate', {
            onSelect: (instance, date) => {
                const obj = { name: 'shippingDate', value: date.toLocaleDateString() }
                this.props.onInput(obj)
            },
            formatter: (input, date, instance) => {
                console.log(instance)
                const value = date.toLocaleDateString()
                input.value = value 
            },
            disabledDates: 
                res.data.takenDatesArr.map(date=> new Date(date))
            
        })
    }
    
    onSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            data: this.props.form,
            userId: this.props.logedinUser._id,
            cartId: this.props.cart._id
        }
        await this.props.placeOrder(obj)
        if (!this.props.errorMessage) {
            this.props.clearForm()
            await this.props.history.push('/dashboard')
            this.props.history.push({
                pathname: '/dialog/notify',
                state: { dialogisOpen: true },
                params: (
                <div>
                        <p>Thank you very much for your purchase!</p>
                        <p>the invoice has been forwarded to your email <address>{this.props.logedinUser.email}</address></p>
                        <p>
                            <b>{this.props.notifyMessage}</b>
                        </p>
                        <p>An invoice for display is attached <a href={`http://localhost:5000/data/${this.props.orderId}/bill`} download="bill">here</a></p>
                </div> )
            })
        } else {
            this.props.history.push({
                pathname: '/dialog/error',
                state: { dialogisOpen: true },
                params: this.props.errorMessage
            })
        }
    }
    onDoubleClick = e => {
        if (e.target.name === 'city' || e.target.name === 'street') {
            console.log(e.target)
            const obj = {name:e.target.name, value: this.props.logedinUser[e.target.name]}
            console.log(obj)
            this.props.onInput(obj)
        }
    }

    render() {
        return (
            <div id="confirm_order" className="row" >
                <h5 className="col s12">Hi, We appreciate your choice to buy with Us, Please Fill-in your Payment Details to complete the order process </h5>
                <CustomForm
                    name="form"
                    onsubmit={this.onSubmit}
                    ondoubleclick={this.onDoubleClick}
                    classcss="col s12 card-panel"
                    model={orderForm}
                    currentValue={this.state}
                    btnSubmit={true}
                >
                </CustomForm>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        orderId: state.users.orderId,
        form:state.form,
        errorMessage: state.message.errorMessage,
        notifyMessage: state.message.notifyMessage,
        logedinUser: state.data.logedinUser,
        cart: state.data.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: async (data) => {
            await dispatch(usersActions.placeOrder(data))
        },
        clearForm: () => {
            dispatch({
                type: CLEAR_FORM
            })
        },
        onInput: (data) => {
            dispatch({
                type: ON_INPUT,
                payload: data
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder)


