
import React, { useContext, useState } from 'react';
import { LOGIN_USER } from '../../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../Context/Auth';
import { useForm } from '../util/hooks';
import { Link, useParams } from "react-router-dom";
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
  


  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="limiter">
		<div className="container-login">
			<div className="wrap-login">
				<div className="login-pic js-tilt" data-tilt>
					<img src={require('./images/logo.png')} alt="IMG"/>
				</div>

				<Form onSubmit={onSubmit} noValidate className="login-form validate-form">
					<span Name="login-form-title">
						Member Login
					</span>

					<div className="wrap-input validate-input" >
						<input
            className="input"
            type="text" 
            name="username" 
            placeholder="username"
            value={values.username}
            onChange={onChange}
            />
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input validate-input">
						<input 
            className="input"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            placeholder="Password"
            />
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login-form-btn">
						<button className="login-form-btn" type='submit' onClick={notify} primary>
							Login
						</button>
            <ToastContainer/>
					</div>

				

					<div className="text-center p-t-136">
						<Link to="/register" className="txt2">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</Link>
					</div>
				</Form>
			</div>
		</div>
	</div>
  )}



















    // <div>

    // <div className="login-box">
    //   <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
    //     <div className='inner-box'>
    //     <Form.Input
    //       label="Username"
    //       placeholder="Username.."
    //       name="username"
    //       type="text"
    //       value={values.username}
    //       onChange={onChange}
    //       />
    //       </div>
    //     <div className='inner-box'>
    //     <Form.Input
    //       label="Password"
    //       placeholder="Password.."
    //       name="password"
    //       type="password"
    //       value={values.password}
    //       onChange={onChange}
    //       />
    //       </div>
    //     <div className='inner-box'>
    //     <Button type="submit" onClick={notify} primary>
    //       Login
    //     </Button>
    //     <ToastContainer/>
    //     </div>
    //   </Form>
    //       </div>
    //           </div>)}


export default LoginView;