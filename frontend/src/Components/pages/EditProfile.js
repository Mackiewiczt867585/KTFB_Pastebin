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
import { useNavigate } from "react-router-dom";
import "../Pastes/ShowPastes.css"

function EditProfile() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
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






  let id, email, username, firstName, organisation


  const [editProfile] = useMutation(UPDATE_USER, {
    onCompleted(){
    navigate('/profile');
    logout();
    }
  });





  return (
    <>
      <div className="login-box center">
      <form 
      onSubmit={(e) => {
        if (email.value == ""){
          email.value = profile.email
        }
        if (username.value == ""){
          username.value = profile.username
        }
        if (firstName.value == ""){
          firstName.value = profile.firstName
        }
        if (organisation.value == ""){
          organisation.value = profile.organisation
        }
        e.preventDefault()
        editProfile({
          variables: {
            id: profile.id,
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            organisation: organisation.value
          },
        });
      }}
      >
        <label for="title">email: </label>
        <input
        className="edit-input"
          placeholder="email.."
          type="text"
          ref={(value) => (email = value)}
          />
          <label for="title">username: </label>
        <input
        className="edit-input"
          placeholder="username.."
          type="username"
          ref={(value) => (username = value)}
          />
          <label for="title">firstName: </label>
        <input
        className="edit-input"
          placeholder="firstName.."
          type="firstName"
          ref={(value) => (firstName = value)}
          />
          <label for="title">organisation: </label>
        <input
        className="edit-input"
          placeholder="organisation.."
          type="organisation"
          ref={(value) => (organisation = value)}
          />
        <div className='inner-box'>
        <button className="paste-link-btn" type="submit" primary>
          Edit
        </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default EditProfile;
