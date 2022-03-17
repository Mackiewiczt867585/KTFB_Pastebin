import React , { Component }from 'react';
import './Wklejka.css'



export class Wklejka extends React.PureComponent{
  state = {
    author: '',
    title: '',
    coloring: '',
    content: '',
    visible: ''
  };

  handleChange =(e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render(){
    const {author, title, coloring, content, visible} = this.state;
    return (
    <div className='outer-box'>
      <div className='input-item-top'>
      <label>Autor</label><br/>
      <input 
      name='author'
      placeholder='author'
      value={author} 
      onChange={this.handleChange}
      />
      </div>
      <div className='input-item-top'>
        <label>Tytuł</label><br/>
      <input 
      name='title'
      placeholder='title'
      value={title} 
      onChange={this.handleChange}
      />
      </div>
      <div className='input-item-top'>
        <label>Kolorowanie</label><br/>
      <select id='coloring' name='coloring'>
      <option value="" disabled selected>Select your option</option>
        <option value="jk">Joke</option>
        <option value="cd">Code</option>
        <option value="inf">Information</option>
        <option value="as">ASCII</option>
        <option value="un">Unspecified</option>
      </select>
      </div>
      <div>
        <label>Content</label><br/>
      <textarea id='content' name='content' rows='30' cols='140'></textarea>
      </div>
       <button onClick={() => console.log('hi')}>Utwórz</button>
    </div>
    );
  }

}

export default Wklejka;












// export class Wklejka extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//         viewCompleted: false,
//         todoList: todoItems,
//         modal: false,
//         activeItem: {
//             title: "",
//             description: "",
//             completed: false,
//         },
//         };
//     }
    
//     toggle = () => {
//         this.setState({ modal: !this.state.modal });
//     };
    
    
    
//     createItem = () => {
//         const item = { title: "", description: "", completed: false };
    
//         this.setState({ activeItem: item, modal: !this.state.modal });
//     };
    






//     render(){
//     return (
//         <div className='outer-box'>
//                 <div className='form-sub'>
//                 {this.state.modal ? (
//                     <Modal className='modal-content'
//                     activeItem={this.state.activeItem}
//                     toggle={this.toggle}
//                     onSave={this.handleSubmit}
//                     />
//                     ) : null}
//                 <button onClick={this.createItem}>Utwórz</button>
//                     </div>
//                     </div>
//     );
// }
// }

// export default Wklejka;