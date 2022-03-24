import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import Recent from './Components/pages/Recent';
import Popular from './Components/pages/Popular';
import About from './Components/pages/About';
import Footer from './Components/Footer';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import Profile from './Components/pages/Profile'
import EditProfile from './Components/pages/EditProfile';
import ChangePass from './Components/pages/ChangePass'




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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/profile/changepass' element={<ChangePass />} />
        </Routes>
      </Router>
      <Footer />
      </>
  );
}

export default App;
