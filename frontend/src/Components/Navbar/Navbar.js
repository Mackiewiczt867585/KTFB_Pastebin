import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

<<<<<<< HEAD
<<<<<<< HEAD:frontend/src/Components/Navbar/Navbar.js
import { AuthContext} from '../Context/Auth'

=======
import { AuthContext } from "./Context/Auth";
>>>>>>> c78d897 (Added cypress add paste tests):frontend/src/Components/Navbar.js
=======
<<<<<<< HEAD:frontend/src/Components/Navbar.js
import { AuthContext } from "./Context/Auth";
=======
import { AuthContext} from '../Context/Auth'

>>>>>>> e265a15 (sorting files):frontend/src/Components/Navbar/Navbar.js
>>>>>>> dc95d0c (sorting files)

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const navbar = user ? (
    <>
      <nav className="fixed-nav-bar">
        <div className="navbar-container">
          <Link to="/" className="nav-item">
            KTFB
          </Link>
          <Link to="/" className="nav-item">
            Utwórz
          </Link>
          <Link to="/recent" className="nav-item">
            Aktualne
          </Link>
          <Link to="/popular" className="nav-item">
            Popularne
          </Link>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/profile" className="nav-item">
            profile
          </Link>
          <button className="nav-item" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  ) : (
    <>
      <nav className="fixed-nav-bar">
        <div className="navbar-container">
          <Link to="/" className="nav-item">
            KTFB
          </Link>
          <Link to="/" className="nav-item">
            Utwórz
          </Link>
          <Link to="/recent" className="nav-item">
            Aktualne
          </Link>
          <Link to="/popular" className="nav-item">
            Popularne
          </Link>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/login" className="nav-item">
            Login
          </Link>
          <Link to="/register" className="nav-item">
            Register
          </Link>
        </div>
      </nav>
    </>
  );

  return navbar;
}

export default Navbar;
