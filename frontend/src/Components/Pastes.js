import React, { useContext, useState } from "react";
import { CREATE_PASTE_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./Pastes.css";
import { AuthContext } from "./Context/Auth";

const Pastes = () => {
  let author, title, content, privated, type;
  const [createPaste] = useMutation(CREATE_PASTE_MUTATION);
  const { user } = useContext(AuthContext); 
  const creator = user ? ( user.email ): ('annonymous')
  return (
    <div className="outer-box">
      <form
        onSubmit={(e) => {
          createPaste({
            variables: {
              title: title.value,
              author: author.value,
              content: content.value,
              type: type.value,
              creator: creator,
              private: document.getElementById('privated').checked
            },
          });
        }}
      >
        <div className="input-item-top">
          <label for="title">Title</label>
          <br />
          <input
            ref={(value) => (title = value)}
            id="title"
            placeholder="enter title"
          />
        </div>
        <div className="input-item-top">
          <label for="author">Author</label>
          <br />
          <input
            ref={(value) => (author = value)}
            id="author"
            placeholder="enter author"
          />
        </div>
        <div className="input-item-top">
          <label for="type">Type</label>
          <br />
          <select ref={(value) => (type = value)}>
            <label for="type">Type</label>
            <br />
            <option value="jk">Joke</option>
            <option value="cd">Code</option>
            <option value="in">Information</option>
            <option value="as">ASCII</option>
            <option value="us" selected>
              Unspecified
            </option>
          </select>
        </div>
        <div>
          <label for="content">Content</label>
          <br />
          <textarea
            ref={(value) => (content = value)}
            id="content"
            placeholder="enter content"
            rows="25"
            cols="200"
          />
        </div>
        <div>
          <label for="private">private</label>
          <br />
          <input
            type='checkbox'
            ref={(value) => (privated = value)}
            id="privated"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Pastes;
