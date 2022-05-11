import React, { useEffect, useState, useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LOAD_PUBLIC_PASTES } from "../GraphQL/Queries";
import { DELETE_PASTE } from "../GraphQL/Mutations";
import "./GetPastes.css";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import {Button} from 'semantic-ui-react'
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import ReactPaginate from "react-paginate";
import { AuthContext } from "./Context/Auth";
import { FaTrash, FaPen } from "react-icons/fa";

TimeAgo.addDefaultLocale(en);

function GetPastes({ currentItems }) {
  const { user } = useContext(AuthContext);

  const [deletePaste] = useMutation(DELETE_PASTE);
  if (currentItems)
    return (
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
                    {user && val.creator && user.email === val.creator.email && (
                      <div>
                        <Link to = {'/paste/'+ val.id + '/edit/'}>
                      <Button
                      color="red"
                      floated="right"
                      onClick={() => console.log('Delete post')}
                      >
                        <FaPen/>
                      </Button>
                        </Link>
                        <Button
                          color="red"
                          floated="right"
                          onClick={() =>
                            deletePaste({ variables: { id: val.id } })
                          }
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    )}
                    <Link to = {'/paste/'+ val.id + '/report/'}>
                      <Button
                      color="red"
                      floated="right"
                      onClick={() => console.log('report post')}
                      />
                        </Link>

                    {(user && val.creator) && user.email === val.creator.email &&(
                      <div>
                        <Link to = {'/paste/'+ val.id + '/edit/'}>
                      <Button
                      color="red"
                      floated="right"
                      onClick={() => console.log('Delete post')}
                      >
                        <FaPen/>
                      </Button>
                        </Link>
                        <Button
                          color="red"
                          floated="right"
                          onClick={() =>
                            deletePaste({ variables: { id: val.id } })
                          }
                        >
                          <FaTrash />
                        </Button>
                      </div>
                  )}

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
    );
}

function PaginatedItems() {
  const { error, loading, data } = useQuery(LOAD_PUBLIC_PASTES);
  const [pastes, setPastes] = useState([]);
  const itemsPerPage = 10;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (data) {
      setPastes(data.allPublicCopies);

      const endOffset = itemOffset + itemsPerPage;

      setCurrentItems(pastes.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(pastes.length / itemsPerPage));
    }
  }, [data, loading, error, pastes, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pastes.length;
    setItemOffset(newOffset);
  };
  if (loading) return <h1>loading</h1>;
  if (currentItems)
    return (
      <>
        <GetPastes currentItems={currentItems} />
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
