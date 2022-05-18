import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/pages/Home";
import Recent from "./Components/pages/Recent";
import Popular from "./Components/pages/Popular";
import About from "./Components/pages/About";
import Footer from "./Components/Footer/Footer";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/Login";
import Profile from "./Components/pages/Profile";
import EditProfile from "./Components/pages/EditProfile";
import ChangePass from "./Components/pages/ChangePass";
import Paste from "./Components/pages/Paste";
import EditPaste from "./Components/pages/EditPaste";
import { AuthProvider } from './Components/Context/Auth'
import PrivateRoute from "./Components/util/PrivateRoute";


import ReportPaste from "./Components/pages/ReportPaste"


import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <>
      <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />


          <Route path='/paste/:id/report' element={<ReportPaste/>}/>


          <Route path='/paste/:id/edit' element={<EditPaste/>}/>

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile /> 
            </PrivateRoute>
          }
          />
          <Route path="/profile/edit" element={<EditProfile />} />
          {/* <Route path="/profile/changepass" element={<ChangePass />} /> */}
          <Route path="/paste/:id" element={<Paste />} />
        </Routes>
      </Router>
      <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
