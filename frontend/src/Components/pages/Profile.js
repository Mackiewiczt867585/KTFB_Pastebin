import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import "../Profile.css";
import { Link, useParams } from "react-router-dom";
import { ALL_USER_PASTES, USER_BY_EMAIL, ME } from "../../GraphQL/Queries";
import { AuthContext } from "../Context/Auth";
import { useQuery, useMutation, gql } from "@apollo/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import ReactPaginate from "react-paginate";
import { Button, Icon } from "semantic-ui-react";
import { FaTrash, FaPen } from "react-icons/fa";
import { DELETE_PASTE } from "../../GraphQL/Mutations";
import { ShowPastes } from "../Pastes/ShowPastes";
TimeAgo.addDefaultLocale(en);

// function GetUser() {
//   const {user} = useContext(AuthContext);
//   const {data, loading, error} = useQuery(ME)
// const [profile, setProfile] = useState([]);
//     useEffect(() => {
//         if (data) {
//             setProfile(data.userEmail);
//     }
//   }, [data, loading, error]);
//   return profile;
// };

function GetUser() {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(USER_BY_EMAIL, {
    variables: { email: user.email },
  });
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (data) {
      setProfile(data.userEmail);
    }
  }, [data, loading, error]);
  return profile;
}

function Profile({ user }) {
  const admin =
    user.email == "admin@gmail.com" ? (
      <a href="http://localhost:5432/admin" className="settings-item">
        Admin panel
      </a>
    ) : (
      <p></p>
    );
  return (
    <div>
      <h1 className="title">{user.username}</h1>

      <h2 className="title">Your pastes</h2>
      <div className="settings-box">
        {admin}
        <Link to="edit" className="settings-item">
          Edit profile
        </Link>
      </div>
    </div>
  );
}

function PaginatedItems() {
  const user = GetUser();
  const { error, loading, data } = useQuery(ALL_USER_PASTES, {
    variables: { creator: user.id },
  });
  const [pastes, setPastes] = useState([]);
  const itemsPerPage = 10;
  const [userPastes, setUserPastes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    if (data) {
      setPastes(data.allUsersCopies);

      const endOffset = itemOffset + itemsPerPage;

      setUserPastes(pastes.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(pastes.length / itemsPerPage));
    }
  }, [data, loading, error, pastes, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pastes.length;
    setItemOffset(newOffset);
  };
  if (loading) return <h1>loading</h1>;
  if (userPastes)
    return (
      <>
        <Profile user={user} />
        <ShowPastes currentItems={userPastes} />
        <div className="page-select">
          <ReactPaginate
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
}

export default PaginatedItems;
