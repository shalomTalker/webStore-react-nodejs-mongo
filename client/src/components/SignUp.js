import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signupForm } from './inputsModel'
import { CLEAR_FORM } from '../actions/types'




import * as authActions from '../actions/authActions'

import CustomForm from './CustomForm'
import SharingCard from './SharingCard'

class SignUp extends Component {
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
        await this.props.signUp(this.props.form)
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
            <div id="sign_up" className="row center" >
                <h4 className="col s12 ">Hi, Welcom to WebStore! please Sign-up </h4>
                <CustomForm
                    {...this.props}
                    btnSubmit={true}
                    title="Sign Up"
                    onsubmit={this.onSubmit}
                    classcss="col s7 "
                    model={signupForm}>
                </CustomForm>
                <div className="col s4 ">
                    <SharingCard />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        form: state.form,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.message.errorMessage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: async (data) => {
            await dispatch(authActions.signUp(data))
        },
        clearForm: () => {
            dispatch({
                type: CLEAR_FORM
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)