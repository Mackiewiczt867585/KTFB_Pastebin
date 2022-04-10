import React from "react";
import "../../App.css";
import "../Profile.css";
function EditProfile() {
  return (
    <>
      <div className="login-box">
        <div className="inner-box">
          <label>Current Password</label>
          <br />
          <input id="password" placeholder="current password" />
        </div>
        <div className="inner-box">
          <label>New Password</label>
          <br />
          <input id="newpassword" placeholder="newpassword" />
        </div>
        <div className="inner-box">
          <label>Repeat new password</label>
          <br />
          <input id="newpassword" placeholder="repeat new password" />
        </div>
        <div className="inner-box">
          <button>Change password</button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
