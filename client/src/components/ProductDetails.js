import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ProductDetails = (props) => {
    return (
        <div key={props.selectedProduct._id} className="card row valign-wrapper">
            <div className="card-image">
                <img style={{"width": "15rem"}} src={`http://localhost:5000/${props.selectedProduct.image}`} alt={props.selectedProduct.name} />
                
            </div>
            <div className="card-content">
                <h5 className="card-title center-align">name: {props.selectedProduct.name}</h5>
                <h5 className="card-title center-align">Price: {props.selectedProduct.price}</h5>
            </div>
        </div>
                   
    )


}
function mapStateToProps(state) {
    return {
        logedinUser: state.data.logedinUser,
        selectedProduct: state.manage.selectedProduct
    }
}
export default connect(mapStateToProps, null)(ProductDetails)
