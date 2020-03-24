import React from 'react';
import axios from 'axios'

import Register from '../home/Register'
import ChangePassword from './ChangePassword'
import galgadot from '../../assets/images/galgadot.jpg';

import '../../assets/css/UserInfo.css'

import Popover from 'react-tiny-popover'
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


class UserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            user_type: cookies.get('userInfo').user_type,
            accountStatus: cookies.get('userInfo').status,
            first_name: cookies.get('userInfo').name,
            last_name: cookies.get('userInfo').lastName,
            email: cookies.get('userInfo').email,
            birthday: cookies.get('userInfo').birthday.slice(0, 10),
            telephone: cookies.get('userInfo').telephone,
            country: cookies.get('userInfo').country,
            passwordChange: false,
            infoChanged: false,
            subUserRegisterModal: false,
            topPopOverOpen: false,
            midPopOverOpen: false,
            botPopOverOpen: false
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    openChangePasswordModal = () => {
        this.setState({passwordChange: !this.state.passwordChange});
    }

    subUserRegister = () => {
        this.setState({subUserRegisterModal: !this.state.subUserRegisterModal})
    }

    openTopPopOver = () => {
        this.setState({topPopOverOpen: !this.state.topPopOverOpen})
    }

    openMidPopOver = () => {
        this.setState({midPopOverOpen: !this.state.midPopOverOpen})
    }

    openBotPopOver = () => {
        this.setState({botPopOverOpen: !this.state.botPopOverOpen})
    }

    updateUserInfo = () => {
        console.log(this.state.first_name)
        axios.patch('http://localhost:8081/api/v1/auth/update-user-info', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                birthday:this.state.birthday,
                telephone: this.state.telephone,
                country: this.state.country
            }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(() => {
            this.setState({infoChanged: true});
            cookies.set('userInfo', {
                'name': this.state.first_name,
                'lastName': this.state.last_name,
                'email': this.state.email,
                'status': this.state.accountStatus,
                'birthday': this.state.birthday,
                'country': this.state.country,
                'telephone': this.state.telephone
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <this.props.component toggle={null}/>
                <div id='user-info-container'>
                    <div id='user-info'>
                        <img src={galgadot} alt="#" id='user-info-pic'/>
                        <p>
                            <label className="text-field-label" >First Name</label>
                            <input type='text' className='text-field-input' id='first_name' defaultValue={this.state.first_name} onChange={this.saveInputValue} readOnly={this.state.user_type === 'user' ? true : false}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Last Name</label>
                            <input type='text' className='text-field-input' id='last_name' defaultValue={this.state.last_name} onChange={this.saveInputValue} readOnly={this.state.user_type === 'user' ? true : false}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Date of Birth</label>
                            <input type='date' className='text-field-input' id='birthday' defaultValue={this.state.birthday} onChange={this.saveInputValue}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Telephone</label> 
                            <input type='text' className='text-field-input' id='telephone' defaultValue={this.state.telephone} onChange={this.saveInputValue}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Country</label>
                            <input type='text' className='text-field-input' id='country' defaultValue={this.state.country} onChange={this.saveInputValue}/>
                        </p>
                        <p>
                            <label className="text-field-label" >E-mail</label>
                            <input type='email' className='text-field-input' id='email' defaultValue={this.state.email} readOnly={true}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Account Status</label>
                            <input type='text' className='text-field-input' defaultValue={this.state.accountStatus ? 'Account confirmed' : 'Account not confirmed'} readOnly={true}/>
                        </p>
                        {/* <input type='text' defaultValue='what to put....?'/> */}
                        <Popover
                            isOpen={this.state.topPopOverOpen}
                            onClickOutside={() => this.setState({ topPopOverOpen: false })}
                            position={'top'}
                            align={'center'}
                            containerClassName={'pop-over-container'}
                            content={(
                                <div className='pop-over-div'>
                                    You must confirm your account in order to change user info and/or password!
                                </div>
                            )}
                        >
                            <button className='user-info-btn' onClick={this.state.accountStatus ? this.updateUserInfo : this.openTopPopOver} >Save Changes</button>
                        </Popover>
                        <Popover
                            isOpen={this.state.midPopOverOpen}
                            onClickOutside={() => this.setState({ midPopOverOpen: false })}
                            position={'top'}
                            align={'center'}
                            containerClassName={'pop-over-container'}
                            content={(
                                <div className='pop-over-div'>
                                    You must confirm your account in order to change user info and/or password!
                                </div>
                            )}
                        >
                            <button className='user-info-btn' onClick={this.state.accountStatus ? this.openChangePasswordModal : this.openMidPopOver} >Change password</button>
                        </Popover>
                        {this.state.user_type === 'admin' ? 
                            <Popover
                            isOpen={this.state.botPopOverOpen}
                            onClickOutside={() => this.setState({ botPopOverOpen: false })}
                            position={'top'}
                            align={'center'}
                            containerClassName={'pop-over-container'}
                            content={(
                                    <div className='pop-over-div'>
                                        You must confirm your account in order to create a Sub User Account!
                                    </div>
                                )}
                            >
                            <button className='user-info-btn' onClick={this.state.accountStatus ? this.subUserRegister : this.openBotPopOver} >Create Sub User Account</button>
                            </Popover> : 
                        null}
                        {/* Treba da najdam nacin kako samo so btn disabled da gi napravam ... */}
                        {/* <button className='user-info-btn' onClick={this.updateUserInfo} disabled={this.state.accountStatus !=='true' ? true : false}>Save Changes</button> */}
                        {/* <button className='user-info-btn' onClick={this.openChangePasswordModal} disabled={this.state.accountStatus !=='true' ? true : false}>Change password</button> */}
                    </div>
                    <Modal isOpen={this.state.passwordChange} style={customStyles}>
                        <ChangePassword closeModal={this.openChangePasswordModal}/>
                    </Modal>
                    <Modal isOpen={this.state.infoChanged} style={customStyles}>
                            <div className='info-changed-container'>
                                <h3>You have successfuly updated your personal info</h3>
                                <button className='user-info-btn' style={{'width': '200px'}} onClick={() => {this.setState({infoChanged: false})}}>OK</button>
                            </div>
                    </Modal>
                    <Modal isOpen={this.state.subUserRegisterModal} style={customStyles}>
                        <Register loggedIn={true} closeRegisterModal={this.subUserRegister}/>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default UserInfo;