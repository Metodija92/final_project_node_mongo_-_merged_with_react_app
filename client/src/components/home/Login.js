import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import ResetPassword from './ResetPassword'
import { userLoginIn } from '../../redux/actions/productAction'
import Modal from 'react-modal';

import '../../assets/css/Login.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            redirect: false,
            isOpen: false
        }
    }

    // Get input values
    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    // Redirects user to Products page if authentication is successfull
    // ***Cant be used when redirecting from thunk actions,
    // instead use withRouter() to export history and history.push() in thunk action***
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to='/products' />
    //     }
    // }

    logIn = (event) => {
        event.preventDefault();
        this.props.userLoginIn(
            this.state.email,
            this.state.password,
            this.props.history
        );
        cookies.set('cookieTest', 'Kolache');
    }

    resetModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <React.Fragment>
                {/* {this.renderRedirect()} */}
                <div id="login">

                    <div className="box-container" id="login-container">
                        <form action="">
                            <p className="input-container">
                                {/* Vo label fali for="" zaso react vo console go dava kao error, dali treba da bide htmlFor ?*/}
                                <label className="text-field-label" >E-mail</label> <br />
                                <input type="email" className="text-field-input" id='email' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Password</label> <br />
                                <input type="password" className="text-field-input" id='password' onChange={this.saveInputValue} />
                            </p>
                            <button className="primary-button long" onClick={this.logIn}>SIGN IN</button>
                        </form>
                        <p id='reset-link'>Can't remember your password ? 
                            <button id='reset-link-button' onClick={this.resetModal}>Click here</button>
                        </p>
                        <Modal isOpen={this.state.isOpen} style={customStyles}>
                            <ResetPassword resetModal={this.resetModal}/>
                        </Modal>
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

function mapDispatchToProps(dispatch) {
    return {
        userLoginIn: (email, password, history) => {
            dispatch(userLoginIn(email, password, history));
        }
    };
}

export default connect(null, mapDispatchToProps)(withRouter(Login))