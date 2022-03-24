import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
  return (
    <>
      <nav className="fixed-nav-bar">
        <div className="navbar-container">
          <Link to='/' className="nav-item">KTFB</Link>
          <Link to='/' className="nav-item">Utwórz</Link>
          <Link to='/recent' className="nav-item">Aktualne</Link>
          <Link to='/popular' className="nav-item">Popularne</Link>
          <Link to='/about' className="nav-item">O KFTB</Link>
          <Link to='/register' className="nav-item">Register</Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar