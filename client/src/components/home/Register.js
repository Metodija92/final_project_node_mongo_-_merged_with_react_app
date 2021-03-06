import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { userRegister, subUserRegister } from '../../redux/actions/productAction'
import RegisterErrorModal from './RegisterErrorModal'

import '../../assets/css/Register.css'

import ReactLoading from 'react-loading';
import Modal from 'react-modal';
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

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            birthday: null,
            telephone: null,
            country: null,
            loggedIn: this.props.loggedIn,
            registerErrorModal: false,
            registerErrorMessage: ''
        }
    }

    // Get input values
    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    // When rendered in 'user info' for creating a sub-user, closes the modal on Cancel btn click
    closeUserInfoModal = (event) => {
        event.preventDefault()
        this.props.closeRegisterModal()
    }

    closeRegisterErrorModal = () => {
        this.setState({registerErrorModal: false})
    }

    // Register new user call (with minor field validaiton)
    registerUser = (event) => {
        if (this.state.first_name === null ||
            this.state.last_name === null ||
            this.state.email === null ||
            this.state.password === null ||
            this.state.birthday === null ||
            this.state.telephone === null ||
            this.state.country === null) {
            event.preventDefault()
            alert('Please fill out all the fields')
        } else {
            event.preventDefault()
            let createUserData = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email.toLowerCase(),
                password: this.state.password,
                birthday: this.state.birthday,
                telephone: this.state.telephone,
                country: this.state.country
            }
            if(!this.state.loggedIn) {
                this.props.userRegister(createUserData, this.props.history)
                setTimeout(() => {
                    if(this.props.createUserFailed) {
                        // console.log(this.props.promiseErrorMessage);
                        this.setState({
                            registerErrorModal: true,
                            registerErrorMessage: this.props.promiseErrorMessage
                        });
                        console.log(this.state.registerErrorMessage);
                        return;
                    }
                }, 500)
            } else {
                this.props.subUserRegister({...createUserData, supervisor_id: cookies.get('userInfo').user_id})
                setTimeout(() => {
                    if(this.props.createUserFailed) {
                        // console.log(this.props.promiseErrorMessage);
                        this.setState({
                            registerErrorModal: true,
                            registerErrorMessage: this.props.promiseErrorMessage
                        });
                        console.log(this.state.registerErrorMessage);
                        return;
                    }
                    this.props.closeRegisterModal()
                }, 500)
            }  
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="register">

                    <div className="box-container" id="register-container">
                        <form action="">
                            <p className="input-container">
                                <label className="text-field-label" >First Name</label> <br />
                                <input type="text" className="text-field-input" id='first_name' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Last Name</label> <br />
                                <input type="text" className="text-field-input" id='last_name' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >E-mail</label> <br />
                                <input type="email" className="text-field-input" id='email' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Password</label> <br />
                                <input type="password" className="text-field-input" id='password' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Date of Birth</label> <br />
                                <input type="date" className="text-field-input" id='birthday' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Telephone</label> <br />
                                <input type="text" className="text-field-input" id='telephone' onChange={this.saveInputValue} />
                            </p>
                            <p className="input-container">
                                <label className="text-field-label" >Country</label> <br />
                                <input type="text" className="text-field-input" id='country' onChange={this.saveInputValue} />
                            </p>

                            <button className="primary-button long" type="submit" onClick={this.registerUser}>REGISTER</button>
                            {this.state.loggedIn ? 
                                <button className="primary-button long" onClick={this.closeUserInfoModal}>CANCEL</button> 
                            : null}
                        </form>
                        <Modal isOpen={this.state.registerErrorModal} style={customStyles}>
                            <RegisterErrorModal closeModal={this.closeRegisterErrorModal}
                            errorMessage={this.state.registerErrorMessage}/>
                        </Modal>
                        {this.props.createUserStarted ?
                            <ReactLoading type={'spin'} color={'#0abf34'} height={'10%'} width={'10%'} className={'spinner'} />
                        : null}
                    </div>

                    {!this.state.loggedIn ? <div className="aditional-info">
                        <p>Or if you already have an account,
                            <button onClick={this.props.registerAccount} className="register-login">Sign In</button>.
                        </p>
                    </div> : null}
                </div>
            </React.Fragment>
        )
    }

}

function mapStateToProps(state) {
    return {
        createUserStarted: state.productsReducer.createUserStarted,
        createUserFailed: state.productsReducer.createUserFailed,
        promiseErrorMessage: state.productsReducer.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userRegister: (createUserData, history) => {
            dispatch(userRegister(createUserData, history));
        },
        subUserRegister: (createUserData) => {
            dispatch(subUserRegister(createUserData));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))