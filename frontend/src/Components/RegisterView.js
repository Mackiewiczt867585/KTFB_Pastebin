import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./LogRegView.css";

const RegisterView = () => {
  let email, firstName, password, organisation, username;
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return (
    <div className="login-box">
      <form
        onSubmit={(e) => {
          createUser({
            variables: {
              email: email.value,
              firstName: firstName.value,
              organisation: organisation.value,
              password: password.value,
              username: username.value,
            },
          });
        }}
      >
        <div className="inner-box">
          <label for="email">Email</label>
          <br />
          <input
            ref={(value) => (email = value)}
            id="email"
            placeholder="enter email"
          />
        </div>
        <div className="inner-box">
          <label for="firstName">FirstName</label>
          <br />
          <input
            ref={(value) => (firstName = value)}
            id="firstName"
            placeholder="enter First Name"
          />
        </div>
        <div className="inner-box">
          <label for="organisation">organisation</label>
          <br />
          <input
            ref={(value) => (organisation = value)}
            id="organisation"
            placeholder="enter organisation"
          />
        </div>
        <div className="inner-box">
          <label for="username">username</label>
          <br />
          <input
            ref={(value) => (username = value)}
            id="username"
            placeholder="enter username"
          />
        </div>
        <div className="inner-box">
          <label for="password">password</label>
          <br />
          <input
            type="password"
            ref={(value) => (password = value)}
            id="password"
            placeholder="enter password"
          />
        </div>
        <div className="inner-box">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
