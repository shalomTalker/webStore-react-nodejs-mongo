import React from 'react';
import logo from './logo.png';

import './App.css';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



const App = (props) => {
  return (
    <div className="App Site" aria-hidden={props.ariaHide} >
      <div className="Site-content">
        <div className="App-header">
          <Header {...props} />
        </div>
        <div className="main">
          {props.children}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    ariaHide: state.dialog.ariaHide
  }
}
export default withRouter(connect(mapStateToProps, null)(App))
