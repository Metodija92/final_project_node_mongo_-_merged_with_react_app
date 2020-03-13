import React from 'react';

import galgadot from '../../assets/images/galgadot.jpg';

class UserInfo extends React.Component {
    constructor() {
        super(),
        this.state = {

        }
    }

    render() {
        return (
            <div id='user-info-container'>
                <div id='user-info'>
                    <img src={galgadot} alt="#" className="profile-picture" />
                    <input type='text' placeholder='First Name'/>
                    <input type='text' placeholder='Last Name'/>
                    <input type='text' placeholder='Email'/>
                    <input type='text' placeholder='Status'/>
                    <input type='text' placeholder='Birthday'/>
                    <input type='text' placeholder='Country'/>
                    <input type='text' placeholder='Telephone'/>
                    <input type='text' placeholder='Address ?'/>
                </div>
                
            </div>
        );
    }
}

export default UserInfo;