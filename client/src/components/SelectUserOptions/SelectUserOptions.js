import React from 'react'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const SelectUserOptions = (props) => {

    const {subUsers} = props
    // const adminName = cookies.get('userInfo').name;
    const adminId = cookies.get('userInfo').user_id;

    const selectOptions = () => {
        return subUsers.map((subUser) => <option key={subUser._id} value={subUser._id}>{subUser.first_name}</option>)   
    }
    

    return (
        <React.Fragment>
            <label htmlFor='user-filter'>Select User:</label>
            <select name='user-filter' className="select-box" onChange={props.getUserForSort}>
                <option value={'admin'}>Admin Overwiev</option>
                <option value={adminId}>My products</option>
                {selectOptions()}
            </select>
        </React.Fragment>
    )
}




export default SelectUserOptions