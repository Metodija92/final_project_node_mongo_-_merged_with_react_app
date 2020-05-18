import React, { useState } from 'react'
import axios from 'axios'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import '../../assets/css/ResetPassword.css'

const ResetPasswordInputs = () => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const setNewPassword = () => {
        let location = window.location.pathname.split('/');
        axios.post('/api/v1/auth/reset-password', {
            pass1: pass1,
            pass2: pass2,
            reset_hash: location[2],
            email: location[3]
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div id='reset-inputs-container'> 
            <div id='reset-inputs'>
                <h2>Please enter new password</h2>
                <input type='password' className="text-field-input" placeholder='Enter new password' onChange={(event)=>{setPass1(event.target.value)}}></input>
                <input type='password' className="text-field-input" placeholder='Repeat new password' onChange={(event)=>{setPass2(event.target.value)}}></input>
                <Link to='/'>
                    <button className='primary-button long' onClick={setNewPassword}>Reset password</button>
                </Link>
            </div>
        </div>
    )
}

export default ResetPasswordInputs