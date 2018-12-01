import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { closeDialog } from '../../actions/dialogActions';
import { Redirect } from 'react-router'
// import { quantityFormModel } from '../inputsModel'

import Quantity from '../Quantity'

import './Dialog.css'


/**
 * @class DialogComponent 
 * @summary child Component that include the dialog tag structure
 * and handles the event handlers of user interaction 
 * @returns A dialog tag in which the content is found and the footer
 * 
 */
const DialogRoot = document.getElementById('dialogPlaceholder');
class Dialog extends Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.inputField = React.createRef();
        this.state = {
            dialogisOpen: props.location.state.dialogisOpen
        }
    }

    componentWillUnmount = () => {

        DialogRoot.removeChild(this.el);
        window.removeEventListener('keyup', this.keyUpHandler);
        document.removeEventListener('click', this.outsideClickHandler);
    }
    componentDidMount = () => {
        if (this.state.dialogisOpen) {
            DialogRoot.appendChild(this.el);
            window.addEventListener('keyup', this.keyUpHandler);
            document.addEventListener('click', this.outsideClickHandler);
        }
    }
    closeDialog = () => {
        // DialogRoot.removeChild(this.el);
        window.removeEventListener('keyup', this.keyUpHandler);
        document.removeEventListener('click', this.outsideClickHandler);
        this.setState({ dialogisOpen: false })
        this.props.history.goBack()
        this.props.closeDialog()
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 27) {
            this.closeDialog()
        }
    }

    outsideClickHandler = (e) => {
        if (!this.inputField.contains(e.target)) {
            this.closeDialog();
        }
    }

    render = () => {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                props: this.props,
                closeDialog: this.closeDialog
            });
        });
        const DialogEl = this.state.dialogisOpen && (
            <div>
                <div id="dialog-overlay" ></div>
                <dialog id="dialog" ref={el => this.inputField = el}>
                    <button
                        aria-label="Close"
                        onClick={this.closeDialog}>
                        ✗
                    </button>
                    <div role="document">
                        {children}
                    </div>
                </dialog>
            </div>
        );
        return ReactDOM.createPortal(
            DialogEl,
            this.el
        )
    }
}


export default connect(null, { closeDialog })(Dialog);