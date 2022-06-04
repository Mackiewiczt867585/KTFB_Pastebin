import React, { useContext, useState } from "react";
import { CREATE_PASTE_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./CreatePastes.css";
import { AuthContext } from "../Context/Auth";
import { Redirect, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment-timezone';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const CreatePastes = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  var finalDate = moment.utc(startDate);
  var final = finalDate.format();
  console.log(finalDate.format())
  let id, author, title, content, privated, type, image, expirationTime;
  const [createPaste, {data}] = useMutation(CREATE_PASTE_MUTATION,{
    onCompleted(data) {
      navigate('/paste/'+ data.createCopy.copycasket.id)
    }
  })
  const { user } = useContext(AuthContext); 
  const [selectedImage, setSelectedImage] = useState(null);
  const creator = user ? ( user.email ): null


  return (
    <>
    <div className="outer-box">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPaste({
            variables: {
              title: title.value,
              author: author.value,
              content: content.value,
              type: type.value,
              creator: creator,
              image: selectedImage,
              private: document.getElementById('privated').checked,
              expirationTime: finalDate.format()
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
            rows="10"
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
        <div>
      <label>Data wygasniecia</label>
      <br/>
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        isClearable
        placeholderText="wybierz date wyasniecia"
        />
        </div>
    </div>
        <div className="center">
          <button className="noselect button-add" type="submit">add</button>
        </div>
        </form>
    </div>
        </>
  );
};

export default CreatePastes;
