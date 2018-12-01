import React from 'react'

const AlertsHandler = WrappedComponent => ({ show, children, typeMessage, history }) => {
    if(!children){
        history.goBack()
    }
    return (
        <WrappedComponent>
            {
                (show) && (
                    <div>
                        <div className="alert-message">
                            <h3>
                                {(typeMessage === 'error')
                                    ? 'Oops! Something went wrong!'
                                    : 'Hi, Message for you'
                                }
                            </h3>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                )
            }
        </WrappedComponent>
    );
};
export default AlertsHandler



// const CompShouldAlert = alertsHandler(({ children }) => <div>{children}</div>)


// class App extends React.Component {


//     render() {
//         return (
//             <CompShouldAlert
//                 typeMessage={this.state.typeMessage}
//                 showError={this.state.showError}>
//                 <h4>{this.state.errorMessage}</h4>
//             </CompShouldAlert>
//         );
//     }
// }