import React from "react";
import "../../App.css";
import ShowPastes from "../Pastes/ShowPastes";

function Recent() {
  return (
    <>
      <h1 className="title">Aktualne wklejki</h1>
      <ShowPastes />
    </>
  );
}

export default Recent;
