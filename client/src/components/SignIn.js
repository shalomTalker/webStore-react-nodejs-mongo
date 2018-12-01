import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signinForm } from './inputsModel'
import { CLEAR_FORM } from '../actions/types'


import CustomForm from './CustomForm'

import * as authActions from '../actions/authActions'

class SignIn extends Component {

    componentWillMount = () => {
        if (!this.props.errorMessage) {
            this.props.clearForm()
        }

        if (this.props.isAuthenticated) {
            this.props.history.push('/')
        }
    }
    onSubmit = async (e) => {
        e.preventDefault()
        await this.props.signIn(this.props.form)
        if (!this.props.errorMessage) {
            this.props.clearForm()
            this.props.history.push('/')
        } else {
            this.props.history.push({
                pathname: '/dialog/error',
                state: { dialogisOpen: true },
                params: this.props.errorMessage
            })
        }
    }


    render() {
        return (
            <div id="sign_in" className="row center" >
                <h4 className="col s12">Hi, Welcome to WebStore! please Sign-In </h4>
                <CustomForm
                    btnSubmit={true}
                    title="Sign In"
                    onsubmit={this.onSubmit}
                    classcss=" card-panel"
                    model={signinForm}
                >
                </CustomForm>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        form: state.form,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.message.errorMessage
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signIn: async (data) => {
            await dispatch(authActions.signIn(data))
        },
        clearForm: () => {
            dispatch({
                type: CLEAR_FORM
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)