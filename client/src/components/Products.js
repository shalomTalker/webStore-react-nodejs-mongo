import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as manageActions from '../actions/manageActions'


const Products = (props) => {
  const queryId = props.location.search.split('?')[1]
  const pathname = props.location.pathname.split('/')[1]
  const productsList = (queryId === undefined) ?
    props.products :
    props.products.filter(({ category_id }) => category_id === queryId)


  const filtered = (props.form)
    ? productsList.filter(prod => (prod.name.includes(props.form)) && prod)
    : productsList

  const content = filtered.map(prod => {
    return (
      <div key={prod._id} className="col s12 m6 l4">
        <div
          onClick={() => (pathname !== 'dashboard') && props.initSelectedProduct(prod, props)}
          className={(pathname !== 'dashboard') ? "card productToSelect" : "card"}>
          <span className="card-title">{prod.name}</span>
          <div className="card-image">
            <img src={`http://localhost:5000/${prod.image}`} alt={prod.name} />
            {(pathname === 'dashboard') &&
              <Link
                to={{
                pathname: "/dialog/quantity",
                  state: { dialogisOpen: true },
                  params: prod
                }}
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() => props.handleClick()}
                type="button"> <i className="material-icons">add</i>
              </Link>}
          </div>
          <div className="card-content">
            <h4>{prod.price}</h4>
            <p>I am a very simple card.</p>
          </div>
        </div>
      </div>
    )
  })


  return (
    <div className="row">
      <div className="cards">
        {content}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    products: state.data.products,
    form: state.form.productsSearch
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    initSelectedProduct: (prod, props) =>{
      props.history.push(`/manage/details/?${prod.category_id}`)
      dispatch(manageActions.initSelectedProduct(prod))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)
