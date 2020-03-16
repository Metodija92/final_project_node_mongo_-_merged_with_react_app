import React, {useState} from 'react'
import axios from 'axios'

import '../../assets/css/ChangePassword.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ChangePassword = (props) => {
    const [oldPass, setOldPass] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const changeUserPassword = () => {
        if(pass1 === pass2) {
            axios.post('http://localhost:8081/api/v1/auth/change-password', {
                oldPass: oldPass,
                pass1: pass1,
                pass2: pass2,
                email: cookies.get('email')
            }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
            .then(() => {
                alert('You have changed your password');
                props.closeModal();
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
        </div>
    )
}

export default ChangePassword