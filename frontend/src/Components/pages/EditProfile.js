import React from 'react';
import '../../App.css';
import '../Profile.css';
function EditProfile() {
  return (
    <>
        <div className='login-box'>
            <label>Username</label>
        <input
    id = "editusername"
    placeholder='example'/>
    <br/>
    <label>Email address</label>
        <input
    id = "editemail"
    placeholder='example@gmail.com'/>
        <p>Email status: Verified</p>
        <button>Update profile</button>
        </div>
    </>
  );
}

export default EditProfile;