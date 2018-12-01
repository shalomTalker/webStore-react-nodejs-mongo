import React, { Component } from 'react'
import { connect } from 'react-redux'
import { productsSearchForm } from './inputsModel'
import  CustomForm  from './CustomForm'
import { CLEAR_FORM } from '../actions/types'




class Search extends Component {
    componentWillMount = () => {
            this.props.clearForm()
    }
    render() {
        return (
            <div className="row">
                <CustomForm
                    onsubmit={(e) => { e.preventDefault() }}
                    classcss="input-field col s6"
                    model={productsSearchForm}
                    btnSubmit={false}>
                </CustomForm>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.data.products
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
export default connect(mapStateToProps, mapDispatchToProps)(Search)
