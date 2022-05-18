import React, { useState, useContext } from "react";
import { Button, Form, Message } from 'semantic-ui-react';
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LogRegView.css";

import { AuthContext } from '../Context/Auth'
import { useForm } from '../util/hooks';
import { ME } from "../../GraphQL/Queries";




function RegisterView(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const notify = () => {toast()}
  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: '',
    firstName: '',
    organisation: '',
    password1: '',
    password2: '',
    username: ''
  });

  const [addUser, { loading,error}] = useMutation(CREATE_USER_MUTATION, {
    update(
      _,
      {
       data: { register: userData }
      }
      ) {

        if (userData.errors != null){
          const check = Object.keys(userData.errors).map(key => {
            return userData.errors[key].map((dataItem) => {
              return [key,' : ', dataItem.message]
            });
          })
          var step;
          console.log(check)
          var lengtht = Object.keys(userData.errors).length
          for (step =0; step < lengtht;step++){
            toast.error(<div>{check[step]}</div>)
          }
        }
        if(userData.token != null){
          console.log(userData)
      context.login(userData);
      navigate('/profile');
      }
    },
    variables: values
  });

function registerUser() {
  addUser();
}


return (
  <div>
  
    <div className="login-box">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <div className="inner-box">
          <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          type='text'
          value={values.username}

          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Form.Input
          label='email'
          placeholder='email...'
          name='email'
          type='email'
          value={values.email}

          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Form.Input
          label='firstName'
          placeholder='firstName...'
          name='firstName'
          type='text'
          value={values.firstName}
          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Form.Input
          label='organisation'
          placeholder='organisation...'
          name='organisation'
          type='text'
          value={values.organisation}
          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Form.Input
          label='password1'
          placeholder='password...'
          name='password1'
          type='password'
          value={values.password1}
          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Form.Input
          label='password2'
          placeholder='password...'
          name='password2'
          type='password'
          value={values.password2}
          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Button type='submit' onClick={notify} primary>
            Register
          </Button>
          <ToastContainer/>
          </div>
          </Form>
          </div>
              </div>)}
                

export default RegisterView;
