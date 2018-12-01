import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
// import { createBrowserHistory } from 'history';


import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Quantity from './components/Quantity';
import AlertsHandler from './components/AlertsHandler';
import Manage from './components/Manage';
import Dialog from './components/Dialog/Dialog';

import PropTypes from "prop-types"

import * as serviceWorker from './serviceWorker';

import store from './store';

const AlertComp = AlertsHandler(({ children }) => <div>{children}</div>)


Route.propTypes = {
    path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    render: PropTypes.func
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route key='dashboard' path="/dashboard" component={Dashboard} />
                    <Route key='order' exact path="/dashboard/order" component={Dashboard} />
                    <Route key='manage' path="/manage" component={Manage} />
                    <Route key='details' path="/manage/details/" component={Manage} />
                    <Route exact path="/dialog/quantity" render={(props) => (
                        <Dialog {...props}>
                            <Quantity {...props} />
                        </Dialog>)} />

                    <Route exact path={["/dialog/notify", "/dialog/error"]} render={(props) => (
                        <Dialog {...props}>
                            <AlertComp
                                show={true}
                                typeMessage={(props.location.pathname === "/dialog/notify") ? "alert" : "error"}
                                {...props} >{props.location.params}</AlertComp>
                        </Dialog>
                    )} />
                </Switch>

            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
