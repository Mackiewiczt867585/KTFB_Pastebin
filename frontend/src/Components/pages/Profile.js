import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import "../Profile.css";
import { Link, useParams } from "react-router-dom";
import { ALL_USER_PASTES, USER_BY_EMAIL } from '../../GraphQL/Queries';
import { AuthContext} from '../Context/Auth'
import { useQuery, gql } from "@apollo/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import ReactPaginate from "react-paginate";



TimeAgo.addDefaultLocale(en);
function Profile() {
  const {user} = useContext(AuthContext);
  const {error, loading, data } = useQuery( USER_BY_EMAIL, {
    variables: { email: user.email},
  });
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (data) {
      setProfile(data.userEmail);
    } else { 
    }
  }, [profile,data, loading, error]);

  if (profile)
  return(
    <div>
    <h1 className="title">{profile.username}</h1>
    
    <h2 className="title">Your pastes</h2>
    <div className="settings-box">
      <Link to="edit" className="settings-item">
        Edit profile
      </Link>
      <Link to="changepass" className="settings-item">
        ChangePassword
      </Link>
      <Link to="/" className="settings-item">
        LogOut
      </Link>
    </div>
    </div>

  )
}
function GetPastes({ currentItems }) {
  if (currentItems)
    return (
      <>
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Autor</th>
              <th>typ</th>
              <th>Dodano</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((val, pos) => {
              return (
                <tr key={pos}>
                  <td>
                    <Link to={"/paste/" + val.id}>{val.title}</Link>
                  </td>
                  <td> {val.author}</td>
                  <td> {val.type}</td>
                  <td>
                    {" "}
                    <ReactTimeAgo date={val.creationDate} locale="en-US" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
            </>
    );
}
  function PaginatedItems() {
    const {user} = useContext(AuthContext);
    const { error, loading, data } = useQuery(ALL_USER_PASTES, {
      variables: {creator: 3},
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
        <Profile/>
        <GetPastes currentItems={userPastes} />
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
