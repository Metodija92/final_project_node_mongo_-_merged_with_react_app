import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../assets/css/Register.css'

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

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products' />
        }
    }

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
        } 
        else if (this.state.first_name != null &&
            this.state.last_name != null &&
            this.state.email != null &&
            this.state.password != null &&
            this.state.birthday != null &&
            this.state.telephone != null &&
            this.state.country != null) {
            event.preventDefault()
            axios.post('https://desolate-escarpment-53492.herokuapp.com/api/v1/auth/register', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                birthday: this.state.birthday,
                telephone: this.state.telephone,
                country: this.state.country,
                _created: new Date(),
            })
            .then(res => {
                console.log(res)
                axios.post('https://desolate-escarpment-53492.herokuapp.com/api/v1/auth/login', {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(res=>{
                    localStorage.setItem('jwt', res.data.jwt);
                    localStorage.setItem('name', this.state.first_name);
                    localStorage.setItem('lastName', this.state.last_name);
                    this.setState({redirect: true});
                    // this.props.history.push('/products')
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            });
        }
    }

    render () {
        return (
            <React.Fragment>
                {this.renderRedirect()}
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
                                <input type="text" className="text-field-input" id='email' onChange={this.saveInputValue}/>
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

export default Register