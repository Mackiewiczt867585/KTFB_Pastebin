import React, { useEffect, useState, useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LOAD_POPULAR_PASTES } from "../../GraphQL/Queries";
import { DELETE_PASTE } from "../../GraphQL/Mutations";
import "./ShowPastes.css";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from 'react-router-dom';
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import ReactPaginate from "react-paginate";



import { AuthContext } from "../Context/Auth";
import { FaTrash, FaPen, FaBandAid } from 'react-icons/fa';



TimeAgo.addDefaultLocale(en);






  
  
  
  export function ShowPastes({ currentItems }) {
    const {user} = useContext(AuthContext);
    const [deletePaste] = useMutation(
      DELETE_PASTE
      )
      console.log(currentItems)
      
      if (currentItems)
      return (
        <div className="container">
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1-pop">Tytuł</div>
              <div className="col col-2-pop">Autor</div>
              <div className="col col-3-pop">typ</div>
              <div className="col col-4-pop">Liki</div>
              <div className="col col-5-pop">Dodano</div>
              <div className="col col-6-pop"></div>
            </li>




            {currentItems.map((val, pos) => {
              return (
                <li key={pos} className="table-row">
                  <div className="col col-1-pop">
                    <Link className="titles" to={"/paste/" + val.id}>{val.title}</Link>
                    
                    </div>

                  <div className="col col-2-pop"> {val.author}</div>
                  <div className="col col-3-pop"> {val.type}</div>
                  <div className="col col-4-pop"> {val.likes}</div>
                  <div className="col col-5-pop">
                    {" "}
                    <ReactTimeAgo date={val.creationDate} locale="en-US" />
                  </div>
                  <div className="col col-6-pop">

                      {user && val.creator && user.email === val.creator.email && (
                        <div>

                          <Link to = {'/paste/'+ val.id + '/edit/'}>
                        <Button
                        color="red"
                        onClick={() => console.log('Delete post')}
                        >
                          <FaPen/>
                        </Button>
                          </Link>

                          <Button
                            color="red"
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
                      
                      onClick={() => console.log('report post')}
                      >
                        <FaBandAid/>
                      </Button>
                        </Link>
                        </div>
              </li>
              );
            })}
          </ul>
      </div>
    );
}

function PaginatedItems() {
  const { error, loading, data, refetch } = useQuery(LOAD_POPULAR_PASTES);
  const [pastes, setPastes] = useState([]);
  const itemsPerPage = 6;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (data) {
      setPastes(data.popularCopies);

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
        <ShowPastes currentItems={currentItems} />
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
