import React from 'react';
import '../../App.css';
import GetPastes from '../GetPastes';
import '../Profile.css';
import { Link } from 'react-router-dom';
function Profile() {
  return (
    <>
        <h1 className='title'>Your pastes</h1>
        <GetPastes/>
        <h2 className='title'>Your stats</h2>
<div className='outer-box'>
<p>
Your stats:<br/>
Total number of active pastes: 1<br/>
Number of public pastes: 1<br/>
Number of unlisted pastes: 0<br/>
Number of private pastes: 0<br/>
Number of views of your Pastebin page: 1<br/>
Number of total views of all your active pastes: 0<br/>
</p>
</div>
<div className='settings-box'>
    <Link to='edit' className='settings-item'>Edit profile</Link>
    <Link to='changepass' className='settings-item'>ChangePassword</Link>
    <Link to='/' className='settings-item'>LogOut</Link>
</div>
    </>
  );
}

export default Profile;