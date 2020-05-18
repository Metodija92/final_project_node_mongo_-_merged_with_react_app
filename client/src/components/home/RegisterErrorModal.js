import React from 'react'

const RegisterErrorModal = (props) => {

    const formatErrorMessage = () => {
        if(props.errorMessage === 'Validation failed'){
            return 'Please fill out all the fields correctly!'
        } else {
            return 'A user with this e-mail already exists'
        }
    }

    return (
        <div id='error-message-container'>
            <p>{formatErrorMessage()}</p>
            <button onClick={props.closeModal} className='primary-button'>OK</button>
        </div>
    )
}

export default RegisterErrorModal