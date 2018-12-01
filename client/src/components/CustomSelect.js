import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ON_INPUT } from '../actions/types'
const CustomSelect = ({ categories, onInput, form, selectedProduct, location}) => {
    const  pathname  = location.pathname.split('/')[2];
    console.log(pathname)
    return (
        <div >
            <label>Category</label>
            <select 
                defaultValue={(pathname!== 'add')&& selectedProduct.category_id }
        onInput={(e) => onInput(e)} 
            required
            name="category_id" 
            id="select">
                <option value="">--Please choose an category--</option>
                {categories.map(cat => { return (<option key={cat._id}  value={cat._id}>{cat.name}</option>) })}
            </select>
            {(form.category_id === "") && <p className="error red-text">category must be selected</p>}

        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        form: state.form,
        categories: state.data.categories,
        selectedProduct: state.manage.selectedProduct
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onInput: (e) => {
            dispatch({
                type: ON_INPUT,
                payload: e.target
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect)


// class CustomForm extends Component {
//     checkRequired = (e) => {
//         e.preventDefault()
//         const inputsArr = Array.from(e.target.querySelectorAll('.error'))
//         const errorExist = inputsArr.filter(input => (input.contains(e.target.querySelector('.error'))));
//         if (errorExist.length === 0) {
//             this.props.onsubmit(e)
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <h4>{this.props.title}</h4>
//                 <form
//                     encType={(this.props.enctype) && this.props.enctype}
//                     onInput={(e) => (this.props.oninput) && this.props.oninput(e)}
//                     onSubmit={(e) => this.checkRequired(e)}
//                     className={this.props.classcss}>
//                     {
//                         this.props.model.map((field, index) => {
//                             return (
//                                 <div className="input" key={index}>
//                                     <CustomInput
//                                         required={field.required}
//                                         id={field.name}
//                                         type={field.type}
//                                         name={field.name}
//                                         label={field.label}
//                                         icon={(field.icon) && field.icon}
//                                         oninput={this.props.onInput}
//                                         ondoubleclick={this.props.ondoubleclick}
//                                         currentValue={this.props.form}
//                                         onchange={this.props.handleFile}
//                                     ></CustomInput>
//                                     {
//                                         (field.isValid) &&
//                                             (field.isValid(this.props.form[field.name])) || (!this.props.form[field.name]) ?
//                                             undefined :
//                                             <p className="error red-text">{field.errMsg}</p>
//                                     }
//                                 </div>
//                             )

//                         })
//                     }
//                     <div>{this.props.children}</div>
//                     {
//                         (this.props.btnSubmit) &&
//                         <button
//                             className="btn waves-effect waves-light"
//                             type="submit"
//                             name="action">Submit
//                         <i className="material-icons right">send</i>
//                         </button>
//                     }
//                 </form>
//             </div>
//         );
//     }
// }