import React from 'react'
import logo from './logo.png'

export default (props) => {
    return (
        <div >
            <div className="card">
                <div className="card-image">
                    <img className="App-logo" style={{width:"10rem"}}src={logo} />


                    <div className="share-btns">
                        <a href='#'>
                            <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
                        </a>

                        <a href='#'>
                            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                        </a>

                        <a href='#'>
                            <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
                        </a>

                        <a href='#'>
                            <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
                        </a>
                    </div>
                </div>
                <div className="card-content">
                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
    )
}