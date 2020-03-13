import React from 'react';
import galgadot from '../../assets/images/galgadot.jpg';

import '../../assets/css/UserInfo.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class UserInfo extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <this.props.component toggle={null}/>
                <div id='user-info-container'>
                    <div id='user-info'>
                        <img src={galgadot} alt="#" id='user-info-pic'/>
                        <input type='text' defaultValue={cookies.get('name')}/>
                        <input type='text' defaultValue={cookies.get('lastName')}/>
                        <input type='text' defaultValue={cookies.get('email')}/>
                        <input type='text' defaultValue={cookies.get('birthday')}/>
                        <input type='text' defaultValue={cookies.get('country')}/>
                        <input type='text' defaultValue={cookies.get('telephone')}/>
                        <input type='text' defaultValue={cookies.get('status')}/>
                        <input type='text' defaultValue='what to put....?'/>
                        <button className='user-info-btn'>Update profile</button>
                        <button className='user-info-btn'>Change password</button>
                        <button className='user-info-btn'>Sign out</button>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default UserInfo;