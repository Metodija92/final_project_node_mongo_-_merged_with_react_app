import React, {useState} from 'react'
import axios from 'axios'

import '../../assets/css/ChangePassword.css'

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

const ChangePassword = (props) => {
    const [modal, setModal] = useState(false)
    const [oldPass, setOldPass] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    // Close open modal
    const closeModals = () => {
        setModal(false);
        props.closeModal();
    }

    const changeUserPassword = () => {
        if(pass1 === pass2) {
            axios.post('http://localhost:8081/api/v1/auth/change-password', {
                oldPass: oldPass,
                pass1: pass1,
                pass2: pass2,
                email: cookies.get('userInfo').email
            }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
            .then(() => {
                setModal(true)
            })
            .catch(err => {
                console.log(err);
            });
            console.log(pass1)
            console.log(pass2)
        } else {
            alert('Passwords don\'t match!');
        }
    }

    return (
            <div id='change-pass'>
                <label>Enter your old password</label>
                <input type='password' id='oldPass' onChange={(event) => setOldPass(event.target.value)}/>
                <label>Enter new password</label>
                <input type='password' id='pass1' onChange={(event) => setPass1(event.target.value)}/>
                <label>Confirm new password</label>
                <input type='password' id='pass2' onChange={(event) => setPass2(event.target.value)}/>
                <button className='change-pass-btn' onClick={changeUserPassword}>Save</button>
                <button className='change-pass-btn' onClick={props.closeModal}>Close</button>
                <Modal isOpen={modal} style={customStyles}>
                        <div className='info-changed-container'>
                            <h3>You have successfuly changed your password</h3>
                            <button className='user-info-btn' style={{'width': '200px'}} onClick={closeModals}>OK</button>
                        </div>
                </Modal>
            </div>
    )
}

export default ChangePassword