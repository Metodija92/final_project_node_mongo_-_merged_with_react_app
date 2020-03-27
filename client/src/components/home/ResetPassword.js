import React, { useState } from 'react'
import axios from 'axios'

import '../../assets/css/ResetPassword.css'

const ResetPassword = (props) => {
    const [email, getEmail] = useState('');
    const [msg, showMsg] = useState(false);
    const [linkSent, setLink] = useState(false);

    // Get input value
    const saveInputValue = (event) => {
        getEmail(event.target.value);
    }

    // Send reset link to email
    const sendResetLink = () => {
        axios.post('http://localhost:8081/api/v1/auth/reset-link',  {email: email})
        .then(() => {
            showMsg(false);
            setLink(true);
        })
        .catch((err) => {
            console.log(err);
            showMsg(true);
        });
    }

    return (
        <div id='reset-pass-div'>
            <h3>Please enter your email</h3>
            <input type='text' placeholder='Enter email here' onChange={saveInputValue}/>

            {msg ? 
                <p style={{color: 'red', textAlign: 'center'}}>This email has not been used to create an account, please try again</p> : 
            null}

            {linkSent ? 
                <p style={{color: 'red', textAlign: 'center'}}>Please check your email</p> :
            null}

            <button className='reset-modal-button' onClick={sendResetLink}>Get reset link</button>
            <button className='reset-modal-button' onClick={props.resetModal}>{linkSent ? 'Close' : 'Never mind, I remembered ...'}</button>
        </div>
    )
}

export default ResetPassword