import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


const CategoryNav = (props) => {
    let tabs = props.categories.map(({ name, _id, pathName }) => (<li key={_id} className="tab"><Link to={`/${props.route}/details/?${_id}`} >{name}</Link></li>))
        return (
            <div className="row" id="category_nav">
                <nav className="nav-extended">
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            {tabs}
                            <li className="tab col" key="All"><Link to={`/${props.route}/details/`} >All</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
}
const mapStateToProps = (state) => {
    return {
        categories: state.data.categories,
        products: state.data.products
    }
}

export default connect(mapStateToProps, null)(CategoryNav)
