import React, { useState } from 'react';
import { CREATE_PASTE_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import './Pastes.css'




const Pastes = () => {
  let author, title, content, type;
  const [createPaste] = useMutation(CREATE_PASTE_MUTATION);

return(
<div className='outer-box'>
<form onSubmit={ e => {
  createPaste ( { variables: { title: title.value, author:author.value, content:content.value, type:type.value}});
  
}}>
  <div className='input-item-top'>
    <label for='title'>Title</label><br />
    <input
    ref={value => title = value}
    id = "title"
    placeholder='enter title'/>
  </div>
  <div className='input-item-top'>
    <label for='author'>Author</label><br />
    <input
    ref={value => author = value}
    id = "author"
    placeholder='enter author'/>
  </div>
  <div className='input-item-top'>
    <label for='type'>Type</label><br/>
    <select ref={value => type = value}>
      <label for='type'>Type</label><br />
      <option value="" selected disabled hidden>Choose type</option>
      <option value='jk'>Joke</option>
      <option value='cd'>Code</option>
      <option value='in'>Information</option>
      <option value='as'>ASCII</option>
      <option value='us'>Unspecified</option>
    </select>
  </div>
  <div>
    <label for='content'>Content</label><br />
    <textarea
    ref={value => content = value}
    id = "content"
    placeholder='enter content'
    rows='25' cols='200'/>
  </div>
  <div>
    <button type='submit'>add</button>
  </div>
  </form>
  </div>
);
}


    export default Pastes;