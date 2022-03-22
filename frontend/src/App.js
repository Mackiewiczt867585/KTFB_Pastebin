import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import Recent from './Components/pages/Recent';
import Popular from './Components/pages/Popular';
import About from './Components/pages/About';
import Footer from './Components/Footer';








function App() {
  return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/recent' element={<Recent />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
      <Footer />
      </>
  );
}

export default App;
