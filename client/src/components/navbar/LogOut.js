import React from 'react'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const LogOut = (props) => {

    function logOut() {
        props.showLogOut()
        localStorage.clear();   
        cookies.remove('jwt');
        cookies.remove('userInfo');
    }

    return (
        <React.Fragment>
            <div className="alert">
                <div className="alert-container">
                    <div className="alert-text-container">
                        <h1>Sign Out</h1>
                        <p>Are you sure you want to sign out ?</p>
                    </div>
                    <div className="alert-buttons">
                        <button className="alert-btn cancel-alert-btn" 
                        onClick={props.showLogOut}>CANCEL</button>
                        <button className="alert-btn delete-alert-btn" 
                        onClick={logOut}>SIGN OUT</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LogOut