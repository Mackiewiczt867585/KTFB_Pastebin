
import React, { useContext, useState } from 'react';
import { LOGIN_USER } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';

import {AuthContext} from './Context/Auth';
import { useForm } from './hooks';

function LoginView(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { tokenAuth: userData}})
      {
        context.login(userData);
        props.history.push('/');
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
      <form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
      <div className='inner-box'>
        <label for='username'>Username</label>
        <br/>
        <input
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
        <label for='password'>Password</label>
        <br/>
        <input
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
        <button type="submit" primary>
          Login
        </button>
        </div>
      </form>
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