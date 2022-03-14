import React from 'react';
import '../../App.css';
import Wklejka from '../Wklejka';


function Home() {
  return (
    <>
      <h1 className='title'>Utwórz nową wklejkę</h1>
      <Wklejka />
    </>
  );
}

export default Home;