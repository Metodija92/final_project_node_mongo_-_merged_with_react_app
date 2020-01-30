import React from 'react'
import { Redirect } from 'react-router-dom'
import store from '../../redux/store'
import {userLoginIn} from '../../redux/actions/productAction'

import '../../assets/css/Login.css'

class Login extends React.Component {
    constructor () {
        super()
        this.state = {
            email: null,
            password: null,
            redirect: false
        }
    }

    // Get input values
    saveInputValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    // Redirects user to Products page if authentication is successfull
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products' />
        }
    }

    logIn = (event) => {
        event.preventDefault();
        store.dispatch(userLoginIn(this.state.email, this.state.password));
        setTimeout(()=> {
            let jwt = localStorage.getItem('jwt');
            if(jwt != null) {
                this.setState({redirect: true})
            }
        }, 500)
    }

    render () {
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <div id="login">

                    <div className="box-container" id="login-container">
                        <form action="">
                            <p className="input-container">
                                {/* Vo label fali for="" zaso react vo console go dava kao error, dali treba da bide htmlFor ?*/}
                                <label className="text-field-label" >E-mail</label> <br/>
                                <input type="email" className="text-field-input" id='email' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Password</label> <br/>
                                <input type="password" className="text-field-input" id='password' onChange={this.saveInputValue}/>
                            </p>
                            <button className="primary-button long"  onClick={this.logIn}>SIGN IN</button>
                        </form>
                    </div>

                    <div className="aditional-info" id="aditional-info-login">
                        <p>Or if you don't have an account, 
                            <button onClick={this.props.registerAccount} className="register-login">Register</button>.
                        </p>
                    </div>

                </div>
            </React.Fragment>
        )
    }
    
}

export default Login