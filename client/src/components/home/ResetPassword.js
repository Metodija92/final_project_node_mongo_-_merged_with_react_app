import React from 'react'

import '../../assets/css/ResetPassword.css'

const ResetPassword = (props) => {
    return (
        <div id='reset-pass-div'>
            <h3>Please enter your email</h3>
            <input type='text' placeholder='Enter email here'/>
            <button className='reset-modal-button'>Get reset link</button>
            <button className='reset-modal-button' onClick={props.resetModal}>Never mind, I remembered ...</button>
        </div>
    )
}

export default ResetPassword