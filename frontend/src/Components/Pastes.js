import React, { useState } from 'react';
import { CREAET_PASTE_MUTATION } from '../GraphQL/Mutations';


// const CREATE_PASTE = gql`
// mutation createPaste ($author: String!, $content: String!, $title: String!, $type: String!){
//     createPaste (author: $author, content: $content, title: $title, type: $type)
// }
// `;


function Pastes(){
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");


  // const [createPaste, {error}] = useMutation(CREAET_PASTE_MUTATION);

  // const addPaste = () => {};
  // return(
  //   <div className='outer-box'>
  //     <div className='input-item-top'>
  //         <label>Autor</label>
  //     <input 
  //       type="text"
  //       placeholder="author"
  //       onChange={(e) => {
  //         setAuthor(e.target.value);
  //     }}
  //     />
  //     </div>
  //     <div className='input-item-top'>
  //     <label>Tytuł</label>         
  //     <input 
  //       type="text"
  //       placeholder="title"
  //       onChange={(e) => {
  //         setTitle(e.target.value);
  //     }}
  //     />
  //     </div>
  //     <div className='input-item-top'>
          
  //     <input 
  //       type="text"
  //       placeholder="type"
  //       onChange={(e) => {
  //         setType(e.target.value);
  //     }}
  //     />
  //     </div>
  //     <div>
          
  //     <input 
  //       type="text"
  //       placeholder='content'
  //       onChange={(e) => {
  //         setContent(e.target.value);
  //       }}
  //       />
  //       <button onClick={addPaste}> Utwórz</button>
  //       </div>
  //       </div>
  // );
}


//   const addPaste = () => {};
//   return(
//     <div className='outer-box'>
//       <div className='input-item-top'>
//           <label>Autor</label>
//       <input 
//         type="text"
//         placeholder="author"
//       />
//       </div>
//       <div className='input-item-top'>
//       <label>Tytuł</label>         
//       <input 
//         type="text"
//         placeholder="title"
//         onChange={(e) => {
//           setTitle(e.target.value);
//       }}
//       />
//       </div>
//       <div className='input-item-top'>
          
//       <input 
//         type="text"
//         placeholder="type"
//         onChange={(e) => {
//           setType(e.target.value);
//       }}
//       />
//       </div>
//       <div>
          
//       <input 
//         type="text"
//         placeholder='content'
//         onChange={(e) => {
//           setContent(e.target.value);
//         }}
//         />
//         <button onClick={addPaste}> Utwórz</button>
//         </div>
//         </div>
//   );
// }




export default Pastes

