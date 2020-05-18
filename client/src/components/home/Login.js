import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import ResetPassword from './ResetPassword'
import { userLoginIn } from '../../redux/actions/productAction'
import Modal from 'react-modal';
import ReactLoading from 'react-loading';

import '../../assets/css/Login.css'


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
            isOpen: false
        }
    }

    // Get input values
    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    // Auth call to check email/password and redirect if true
    logIn = (event) => {
        event.preventDefault();
        this.props.userLoginIn(
            this.state.email,
            this.state.password,
            this.props.history
        );
    }

    // Open reset password modal
    resetModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <React.Fragment>
                <div id="login">

                    <div className="box-container" id="login-container">
                        <form action="">
                            <p className="input-container">
                                <label className="text-field-label" >E-mail</label> <br />
                                <input type="email" className="text-field-input" id='email' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Password</label> <br />
                                <input type="password" className="text-field-input" id='password' onChange={this.saveInputValue} />
                            </p>
                            <button className="primary-button long" onClick={this.logIn}>SIGN IN</button>
                            {this.props.userLoginFailed ? 
                                <p id='wrong-user-info'>Wrong E-mail or password, please try again</p> 
                            : null}
                        </form>
                        {this.props.userLoginStarted ?
                            <ReactLoading type={'spin'} color={'#0abf34'} height={'10%'} width={'10%'} className={'spinner'} />
                        : null}
                        <p id='reset-link'>
                            Can't remember your password ? 
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

function mapStateToProps(state) {
    return {
        userLoginStarted: state.productsReducer.userLoginStarted,
        userLoginFailed: state.productsReducer.userLoginFailed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLoginIn: (email, password, history) => {
            dispatch(userLoginIn(email, password, history));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))