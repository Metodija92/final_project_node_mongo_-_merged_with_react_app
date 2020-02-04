import React from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { userRegister } from '../../redux/actions/productAction'

import '../../assets/css/Register.css'

import { withRouter } from "react-router-dom"

class Register extends React.Component {
    constructor () {
        super()
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            birthday: null,
            telephone: null,
            country: null,
            redirect: false
        }
    }

    saveInputValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    // Redirects user to Products page if authentication is successfull
    // ***Cant be used when redirecting from thunk actions, 
    // instead use withRouter() to export history and history.push() in thunk action***
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to='/products' />
    //     }
    // }

    registerUser = (event) => {
        if(this.state.first_name === null ||
            this.state.last_name === null ||
            this.state.email === null ||
            this.state.password === null ||
            this.state.birthday === null ||
            this.state.telephone === null ||
            this.state.country === null ){
                event.preventDefault()
                alert('Please fill out all the fields')
        } else  {
            event.preventDefault()
            store.dispatch(userRegister(
                this.state.first_name,
                this.state.last_name,
                this.state.email.toLowerCase(),
                this.state.password,
                this.state.birthday,
                this.state.telephone,
                this.state.country,
                this.props.history)
            )
        }
    }

    render () {
        return (
            <React.Fragment>
                {/* {this.renderRedirect()} */}
                {this.props.createUserStarted ? <h1>CREATING USER</h1> : null}
                <div id="register">
        
                    <div className="box-container" id="register-container">
                        <form action="">
                            <p className="input-container">
                                <label className="text-field-label" >First Name</label> <br/>
                                <input type="text" className="text-field-input" id='first_name' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Last Name</label> <br/>
                                <input type="text" className="text-field-input" id='last_name' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >E-mail</label> <br/>
                                <input type="email" className="text-field-input" id='email' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Password</label> <br/>
                                <input type="password" className="text-field-input" id='password' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Date of Birth</label> <br/>
                                <input type="date" className="text-field-input" id='birthday' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Telephone</label> <br/>
                                <input type="text" className="text-field-input" id='telephone' onChange={this.saveInputValue}/>
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Country</label> <br/>
                                <input type="text" className="text-field-input" id='country' onChange={this.saveInputValue}/>
                            </p>
                                <button className="primary-button long" type="submit" onClick={this.registerUser}>REGISTER</button>
                        </form>
                    </div>
                
                    <div className="aditional-info">
                        <p>Or if you already have an account, 
                            <button onClick={this.props.registerAccount} className="register-login">Sign In</button>.
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    
}

function mapStateToProps (state) {
    return {
        createUserStarted: state.productsReducer.createUserStarted
    }
}

export default connect(mapStateToProps)(withRouter(Register))