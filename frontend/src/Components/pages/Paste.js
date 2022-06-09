import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import { Link, useParams } from "react-router-dom";
import { PASTE_BY_ID } from "../../GraphQL/Queries";
import { useQuery, gql } from "@apollo/client";
import { Form, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../Context/Auth";

function Paste() {
  const { user } = useContext(AuthContext);
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
  console.log(pastes);

  const creator = pastes.creator ? (
    <p>
      creator:{" "}
      <Link to={"/user/" + pastes.creator.email}>
        {pastes.creator.username}
      </Link>
    </p>
  ) : (
    <p>creator: Guest</p>
  );

  return (
    <div>
      <h1 className="title">Wklejka</h1>
      <div className="outer-box">
        <div className="flex-display">
          <p>author: {pastes.author}</p>
          {creator}
        </div>
        <h1 className="wklejka">content:</h1>
        <div className="content">
          <p>{pastes.content}</p>
        </div>
        <div className="flex-display padding-bottom">
          <button
            className="paste-link-btn"
            onClick={navigator.clipboard.writeText(window.location)}
          >
            Skopiuj link do wklejki
          </button>
          <button className="paste-link-btn">
            <Link
              className="report-link"
              to={"/paste/" + pastes.id + "/report"}
            >
              Report
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paste;
