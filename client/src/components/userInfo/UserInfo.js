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
            first_name: cookies.get('userInfo').name,
            last_name: cookies.get('userInfo').lastName,
            email: cookies.get('userInfo').email,
            accountStatus: cookies.get('userInfo').status,
            birthday: cookies.get('userInfo').birthday.slice(0, 10),
            country: cookies.get('userInfo').country,
            telephone: cookies.get('userInfo').telephone,
            user_type: cookies.get('userInfo').user_type,
            user_id: cookies.get('userInfo').user_id,
            supervisor_id: cookies.get('userInfo').supervisor_id,
            passwordChange: false,
            infoChanged: false,
            subUserRegisterModal: false,
            topPopOverOpen: false,
            midPopOverOpen: false,
            botPopOverOpen: false
        }
    }

    // Save fields value to state
    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    // Open change password modal
    openChangePasswordModal = () => {
        this.setState({passwordChange: !this.state.passwordChange});
    }

    // Open register user modal
    subUserRegister = () => {
        this.setState({subUserRegisterModal: !this.state.subUserRegisterModal})
    }

    // Open pop over on btns when user has not confirmed his account (email)
    openTopPopOver = () => {
        this.setState({topPopOverOpen: !this.state.topPopOverOpen})
    }

    // Open pop over on btns when user has not confirmed his account (email)
    openMidPopOver = () => {
        this.setState({midPopOverOpen: !this.state.midPopOverOpen})
    }

    // Open pop over on btns when user has not confirmed his account (email)
    openBotPopOver = () => {
        this.setState({botPopOverOpen: !this.state.botPopOverOpen})
    }

    updateUserInfo = () => {
        console.log(this.state.first_name)
        axios.patch('/api/v1/auth/update-user-info', {
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
                'telephone': this.state.telephone,
                'user_type': this.state.user_type,
                'user_id': this.state.user_id,
                'supervisor_id': this.state.supervisor_id
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