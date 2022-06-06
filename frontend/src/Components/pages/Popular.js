import React from "react";
import "../../App.css";
import PopularPastes from "../Pastes/PopularPastes";

function Popular() {
  return (
    <>
      <h1 className="title">Najbardziej likowane wklejki</h1>
      <PopularPastes />
    </>
  );
}

export default Popular;
