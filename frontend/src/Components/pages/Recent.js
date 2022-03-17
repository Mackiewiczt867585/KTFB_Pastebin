import React from 'react';
import '../../App.css';
import GetPastes from '../GetPastes';


function Recent() {
  return (
    <>
    <h1 className='title'>Aktualne wklejki</h1>
                <GetPastes />
    </>
  );
}

export default Recent;