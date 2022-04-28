import React, {useState, useContext, useEffect} from "react";
import "../../App.css";
import "../Profile.css";
import {Button, Form} from 'semantic-ui-react';
import { useForm } from '../util/hooks'
import { UPDATE_USER } from '../../GraphQL/Mutations';
import { USER_BY_EMAIL } from '../../GraphQL/Queries';
import { useMutation } from '@apollo/client';
import { useQuery} from "@apollo/client";
import { AuthContext } from '../Context/Auth';



function EditProfile() {
  const {user} = useContext(AuthContext);
    const {error, loading, data } = useQuery( USER_BY_EMAIL, {
    variables: { email: user.email},
  });
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (data) {
      setProfile(data.userEmail);
    } else { 
    }
  }, [data, loading, error]);






  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(editProfileCallback, {
    email:'',
    username: '',
    firstName: '',
    organisation: ''
  });
  values.id = profile.id
  const [editProfile] = useMutation(UPDATE_USER, {
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
      variables: values
  });




  function editProfileCallback(){
    editProfile();
  }

  return (
    <>
      <div className="login-box">
      <Form onSubmit={onSubmit} noValidate>
        <Form.Input
          label="email:"
          placeholder="email.."
          name="email"
          type="text"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
          />
        <Form.Input
          label="username:"
          placeholder="username.."
          name="username"
          type="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          />
        <Form.Input
          label="firstName:"
          placeholder="firstName.."
          name="firstName"
          type="firstName"
          value={values.firstName}
          error={errors.firstName ? true : false}
          onChange={onChange}
          />
        <Form.Input
          label="organisation:"
          placeholder="organisation.."
          name="organisation"
          type="organisation"
          value={values.organisation}
          error={errors.organisation ? true : false}
          onChange={onChange}
          />
        <div className='inner-box'>
        <Button type="submit" primary>
          Edit
        </Button>
        </div>
      </Form>
      </div>
    </>
  );
}

export default EditProfile;
