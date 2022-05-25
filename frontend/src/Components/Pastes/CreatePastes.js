import React, { useContext, useState, useEffect } from "react";
import { CREATE_PASTE_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./CreatePastes.css";
import { AuthContext } from "../Context/Auth";
import { Redirect, useNavigate } from 'react-router-dom';
const CreatePastes = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState([]);
  let id, author, title, content, privated, type, image;
  const [createPaste, {data}] = useMutation(CREATE_PASTE_MUTATION,{
    onCompleted : (data) => {
      navigate('/paste/'+ data.createCopy.copycasket.id)
    }
  })
  const { user } = useContext(AuthContext); 
  const [selectedImage, setSelectedImage] = useState();
  const creator = user ? ( user.email ): null


  return (
    <div className="outer-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPaste({
            variables: {
              title: title.value,
              author: author.value,
              content: content.value,
              type: type.value,
              creator: creator,
              image: selectedImage,
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
        <div className="textarea">
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
        <div className="private">
          <label for="private">private</label>
          <br />
          <input
            type='checkbox'
            ref={(value) => (privated = value)}
            id="privated"
          />
        </div>
        <div>
        {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
   
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePastes;
