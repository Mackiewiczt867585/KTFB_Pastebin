import React from "react";
import "../../App.css";
import ShowPastes from "../Pastes/ShowPastes";

function Popular() {
  return (
    <>
      <h1 className="title">Często wyświetlane wklejki</h1>
      <ShowPastes />
    </>
  );
}

export default Popular;
