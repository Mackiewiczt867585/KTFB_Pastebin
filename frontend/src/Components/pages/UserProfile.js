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

        <div className="outer-box display">
      <img src="/user.png"></img>
      <div className="profile-info">
      <h2 className="color">username: </h2><h3>{profile.username}</h3>

      <h2 className="color">email: </h2><h3>{profile.email}</h3>


      <h2 className="color">organisation: </h2><h3>{profile.organisation}</h3>
      </div>
        </div>
      
      </div>
  
    )
  }

  export default Profile;