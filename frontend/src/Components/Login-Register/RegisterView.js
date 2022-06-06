import React, { useState, useContext } from "react";
import { Button, Form, Message } from 'semantic-ui-react';
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LogRegView.css";
import { Link} from "react-router-dom";
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

function registerUser() {
  addUser();
}


return (
  <div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">
      <div className="login100-pic js-tilt" data-tilt>
        <img src={require('./images/logo.png')} alt="IMG"/>
      </div>

      <Form onSubmit={onSubmit} noValidate className="login100-form validate-form">
        <span Name="login100-form-title">
          Member Register
        </span>

        <div className="wrap-input100 validate-input" >
          <input
          className="input100"
          type="text" 
          name="username" 
          placeholder="username"
          value={values.username}
          onChange={onChange}
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>
        </div>

        <div className="wrap-input100 validate-input">
          <input 
          className="input100"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="email"
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
        </div>

        <div className="wrap-input100 validate-input">
          <input
          className="input100"
          type="text" 
          name="firstName" 
          placeholder="firstName"
          value={values.firstName}
          onChange={onChange}
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-child" aria-hidden="true"></i>
          </span>
        </div>

        <div className="wrap-input100 validate-input">
          <input 
          className="input100"
          type="text"
          name="organisation"
          value={values.organisation}
          onChange={onChange}
          placeholder="organisation"
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-building" aria-hidden="true"></i>
          </span>
        </div>

        <div className="wrap-input100 validate-input">
            <input
          className="input100"
          type="password" 
          name="password2" 
          placeholder="Password"
          value={values.password2}
          onChange={onChange}
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
        </div>

        <div className="wrap-input100 validate-input">
          <input 
          className="input100"
          type="password"
          name="password1"
          value={values.password1}
          onChange={onChange}
          placeholder="Confirm password"
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
        </div>
        
        <div className="container-login100-form-btn">
          <button className="login100-form-btn" type='submit' onClick={notify} primary>
            Login
          </button>
          <ToastContainer/>
        </div>

      

        <div className="text-center p-t-136">
          <Link to="/login" className="txt2">
            LogIn
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
          </Link>
        </div>
      </Form>
    </div>
  </div>
</div>
























  // <div>
  
  //   <div className="login-box">
  //     <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
  //       <div className="inner-box">
  //         <Form.Input
  //         label='Username'
  //         placeholder='Username...'
  //         name='username'
  //         type='text'
  //         value={values.username}

  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Form.Input
  //         label='email'
  //         placeholder='email...'
  //         name='email'
  //         type='email'
  //         value={values.email}

  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Form.Input
  //         label='firstName'
  //         placeholder='firstName...'
  //         name='firstName'
  //         type='text'
  //         value={values.firstName}
  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Form.Input
  //         label='organisation'
  //         placeholder='organisation...'
  //         name='organisation'
  //         type='text'
  //         value={values.organisation}
  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Form.Input
  //         label='password1'
  //         placeholder='password...'
  //         name='password1'
  //         type='password'
  //         value={values.password1}
  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Form.Input
  //         label='password2'
  //         placeholder='password...'
  //         name='password2'
  //         type='password'
  //         value={values.password2}
  //         onChange={onChange}
  //         />
  //         </div>
  //         <div className="inner-box">
  //         <Button type='submit' onClick={notify} primary>
  //           Register
  //         </Button>
  //         <ToastContainer/>
  //         </div>
  //         </Form>
  //         </div>
  //             </div>
  )}
                

export default RegisterView;
