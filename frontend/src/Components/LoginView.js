
import React, { useContext, useState } from 'react';
import { LOGIN_USER } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from './Context/Auth';
import { useForm } from './util/hooks';

function LoginView(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _, 
      {
        data: { tokenAuth: userData}
      }
    ) {
        context.login(userData);
        navigate('/profile');
      },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
      variables: values
  });
  


  function loginUserCallback() {
    loginUser();
  }
  return (
    
    <div className="login-box">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <div className='inner-box'>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
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
          error={errors.password ? true : false}
          onChange={onChange}
          />
          </div>
        <div className='inner-box'>
        <Button type="submit" primary>
          Login
        </Button>
        </div>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export default LoginView;