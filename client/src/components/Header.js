import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as authActions from '../actions/authActions'


class Header extends Component {
    signOut = () => {
        this.props.signOut()
    }
    render() {
        const role = (this.props.logedinUser)&& this.props.logedinUser.role
        return (
            <header>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <ul className="left">
                                <li>
                                    <Link to="/">Logo</Link>
                                </li>
                                {this.props.isAuthenticated &&
                                    <li>
                                        <Link to={(role === 'client') ? "/dashboard" : "/manage"}>
                                            {(role === 'client') ? 'Dashboard' : 'Manage'}
                                        </Link>
                                    </li>
                                }
                            </ul>
                            <ul id="nav-mobile" className="right">
                                {!this.props.isAuthenticated &&
                                    [
                                        <li key="signin"><Link to="/signin">Sign-In</Link></li>,
                                        <li key="signup"><Link to="/signup">Sign-Up</Link></li>]
                                }
                                {this.props.isAuthenticated &&
                                    <li><Link to="/signin" onClick={this.signOut}>Sign-Out</Link></li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        logedinUser: state.data.logedinUser

    }
}
export default connect(mapStateToProps, authActions)(Header)