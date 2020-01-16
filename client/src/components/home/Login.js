import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
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

    saveInputValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products' />
        }
    }

    logIn = (event) => {
        event.preventDefault();
        axios.post('https://desolate-escarpment-53492.herokuapp.com/api/v1/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res=>{
            localStorage.setItem('jwt', res.data.jwt);
            localStorage.setItem('name', res.data.first_name);
            localStorage.setItem('lastName', res.data.last_name);
            this.setState({redirect: true});
        })
        .catch(err=>{
            console.log(err)
        });
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