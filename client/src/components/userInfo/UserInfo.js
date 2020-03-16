import React from 'react';
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
            accountStatus: cookies.get('status'),
            isOpen: false
        }
    }

    formatDate = () => {
        let fullDate = cookies.get('birthday')
        let date = fullDate.slice(0, 10)
        return date
    }

    saveInputValue = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    openChangePasswordModal = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <React.Fragment>
                <this.props.component toggle={null}/>
                <div id='user-info-container'>
                    <div id='user-info'>
                        <img src={galgadot} alt="#" id='user-info-pic'/>
                        <input type='text' className='text-field-input' id='first_name' defaultValue={cookies.get('name')}/>
                        <input type='text' className='text-field-input' id='last_name' defaultValue={cookies.get('lastName')}/>
                        <input type='email' className='text-field-input' id='email' defaultValue={cookies.get('email')}/>
                        <input type='date' className='text-field-input' id='birthday' defaultValue={this.formatDate()}/>
                        <input type='text' className='text-field-input' id='telephone' defaultValue={cookies.get('telephone')}/>
                        <input type='text' className='text-field-input' id='country' defaultValue={cookies.get('country')}/>
                        <input type='text' className='text-field-input' defaultValue={this.state.accountStatus ? 'Account confirmed' : 'Account not confirmed'} readOnly={true}/>
                        {/* <input type='text' defaultValue='what to put....?'/> */}
                        <button className='user-info-btn'>Save Changes</button>
                        <button className='user-info-btn' onClick={this.openChangePasswordModal}>Change password</button>
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