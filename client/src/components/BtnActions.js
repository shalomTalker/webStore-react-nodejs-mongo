import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const BtnActions = (props) => {
    const pathname = props.location.pathname
    return (
        <div>
            {
                (pathname === '/manage/details/')
                    ?
                    (<Link
                        to={{
                            pathname: "/manage/edit",
                            params: props.selectedProduct
                        }}
                        className="btn-floating col s5  waves-effect waves-light light-green"
                        type="button"> <i className="material-icons">create</i>
                    </Link>)
                    :
                    (pathname !== '/manage/edit' && pathname !== '/manage/add') &&
                    (<Link
                        to={"/manage/add"}
                        className="btn-floating col s12  waves-effect waves-light blue"
                        type="button"> <i className="material-icons">add</i>
                    </Link>)
            }
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        selectedProduct: state.data.selectedProduct
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BtnActions)
