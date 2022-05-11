
import React, { useContext, useState } from 'react';
import { LOGIN_USER } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from './Context/Auth';
import { useForm } from './util/hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginView(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const notify = () => {toast()}
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(
      _, 
      {
        data: { tokenAuth: userData}
      }
    ) {
      if (userData.errors != null){
        const check = Object.keys(userData.errors).map(key => {
          return userData.errors[key].map((dataItem) => {
            return [key, dataItem.message]
          });
        })
  
        var step;
        var lengtht = Object.keys(userData.errors).length
        for (step =0; step < lengtht;step++){
          toast.error(<div>{check[step]}</div>)
        }
      }
        if(userData.token != null){
        context.login(userData);
        navigate('/profile');
        }
      },
      variables: values
  });
  
  // console.log(error)

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div>

    <div className="login-box">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <div className='inner-box'>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          />
          </div>
        <div className='inner-box'>
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          />
          </div>
        <div className='inner-box'>
        <Button type="submit" onClick={notify} primary>
          Login
        </Button>
        <ToastContainer/>
        </div>
      </Form>
          </div>
              </div>)}


export default LoginView;