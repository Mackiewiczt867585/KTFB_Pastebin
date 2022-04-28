import React, { useState, useContext } from "react";
import { Button, Form } from 'semantic-ui-react';
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./LogRegView.css";


import { AuthContext } from './Context/Auth'
import { useForm } from './util/hooks';

function RegisterView(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: '',
    firstName: '',
    organisation: '',
    password1: '',
    password2: '',
    username: ''
  });

  const [addUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    update(
      _,
      {
       data: { register: userData }
    }
    ) {
      context.login(userData);
      navigate('/profile');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

function registerUser() {
  addUser();
}


  return (
    <div className="login-box">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <div className="inner-box">
          <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
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
          error={errors.email ? true : false}
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
          error={errors.firstName ? true : false}
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
          error={errors.organisation ? true : false}
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
          error={errors.password1 ? true : false}
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
          error={errors.password2 ? true : false}
          onChange={onChange}
          />
          </div>
          <div className="inner-box">
          <Button type='submit' primary>
            Register
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

export default RegisterView;
