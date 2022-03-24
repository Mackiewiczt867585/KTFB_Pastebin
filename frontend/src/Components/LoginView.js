import React, { useState } from 'react';
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import './LogRegView.css'



const Login = () => {

return(
<div className='login-box'>
<form>
  <div className='inner-box'>
    <label for='username'>username</label><br />
    <input
    id = "username"
    placeholder='enter username'/>
  </div>
  <div className='inner-box'>
    <label for='password'>password</label><br />
    <input
    type='password'
    id = "password"
    placeholder='enter password'/>
  </div>
  <div className='inner-box'>
    <button type='submit'>Register</button>
  </div>
  </form>
  </div>
);
}


    export default Login;