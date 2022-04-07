import React from 'react';
import '../../App.css';
import Pastes from '../Pastes';


function Home() {
  return (
    <>
      <h1 className='title'>Utwórz nową wklejkę</h1>
      <Pastes />
    </>
  );
}

export default Home;
