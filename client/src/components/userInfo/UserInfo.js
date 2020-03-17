import React from 'react';
import axios from 'axios'

import ChangePassword from './ChangePassword'
import galgadot from '../../assets/images/galgadot.jpg';

import '../../assets/css/UserInfo.css'
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
            accountStatus: cookies.get('userInfo').status,
            first_name: cookies.get('userInfo').name,
            last_name: cookies.get('userInfo').lastName,
            email: cookies.get('userInfo').email,
            birthday: cookies.get('userInfo').birthday.slice(0, 10),
            telephone: cookies.get('userInfo').telephone,
            country: cookies.get('userInfo').country,
            isOpen: false
        }
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    openChangePasswordModal = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    updateUserInfo = () => {
        console.log(this.state.first_name)
        axios.post('http://localhost:8081/api/v1/auth/update-user-info', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                birthday:this.state.birthday,
                telephone: this.state.telephone,
                country: this.state.country
            }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(() => {
            alert('You have changed your personal info');
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                {console.log()}
                <this.props.component toggle={null}/>
                <div id='user-info-container'>
                    <div id='user-info'>
                        <img src={galgadot} alt="#" id='user-info-pic'/>
                        <p>
                            <label className="text-field-label" >First Name</label>
                            <input type='text' className='text-field-input' id='first_name' defaultValue={this.state.first_name} onChange={this.saveInputValue}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Last Name</label>
                            <input type='text' className='text-field-input' id='last_name' defaultValue={this.state.last_name} onChange={this.saveInputValue}/>
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
                            <input type='email' className='text-field-input' id='email' defaultValue={this.state.email} onChange={this.saveInputValue} readOnly={true}/>
                        </p>
                        <p>
                            <label className="text-field-label" >Account Status</label>
                            <input type='text' className='text-field-input' defaultValue={this.state.accountStatus ==='true' ? 'Account confirmed' : 'Account not confirmed'} readOnly={true}/>
                        </p>
                        {/* <input type='text' defaultValue='what to put....?'/> */}
                        <button className='user-info-btn' onClick={this.updateUserInfo} disabled={this.state.accountStatus !=='true' ? true : false}>Save Changes</button>
                        <button className='user-info-btn' onClick={this.openChangePasswordModal} disabled={this.state.accountStatus !=='true' ? true : false}>Change password</button>
                    </div>
                    <Modal isOpen={this.state.isOpen} style={customStyles}>
                        <ChangePassword closeModal={this.openChangePasswordModal}/>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default UserInfo;