import React, { useEffect, useState } from "react";
import "../../App.css";
import { useParams } from "react-router-dom";
import { PASTE_BY_ID } from "../../GraphQL/Queries";
import { useQuery, gql } from "@apollo/client";

function Paste() {
  const params = useParams();
  const { error, loading, data } = useQuery(PASTE_BY_ID, {
    variables: { copyId: params.id },
  });
  const [pastes, setPastes] = useState([]);
  useEffect(() => {
    if (data) {
      setPastes(data.copy);
    } else {
    }
  }, [data, loading, error]);
  return (
    <>
      <h1 className="title">Wklejka</h1>
      <div className="outer-box">
        <div>
          <p>author: {pastes.author}</p>
          <h1>content:</h1>
        </div>
        <p>{pastes.content}</p>
      </div>
    </>
  );
}

export default Paste;
