import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { USER_BY_EMAIL } from "../../GraphQL/Queries";
import React, { useEffect, useState, useContext } from "react";



function Profile() {

    const params = useParams();
    console.log(params)
    const { error, loading, data } = useQuery(USER_BY_EMAIL, {
      variables: { email: params.email }
    });
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        if (data) {
          console.log(data)
        setProfile(data.userEmail);
      }
    }, [data, loading, error]);
 


    return(
      <div>
  
      <h1 className="title">{profile.username}</h1>
      <h1 className="title">{profile.email}</h1>
      <h1 className="title">{profile.creationDate}</h1>
      <h1 className="title">{profile.organisation}</h1>
      
      <h2 className="title">Your pastes</h2>
      <div className="settings-box">

      </div>
      </div>
  
    )
  }

  export default Profile;