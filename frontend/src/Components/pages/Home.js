import React from "react";
import "../../App.css";
import CreatePastes from "../Pastes/CreatePastes";
function Home() {
  return (
    <>
      <h1 className="title">Utwórz nową wklejkę</h1>
      <CreatePastes />
    </>
  );
}

export default Home;
