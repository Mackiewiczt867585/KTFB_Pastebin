import React from "react";
import "../../App.css";
import GetPastes from "../GetPastes";

function Popular() {
  return (
    <>
      <h1 className="title">Często wyświetlane wklejki</h1>
      <GetPastes />
    </>
  );
}

export default Popular;
