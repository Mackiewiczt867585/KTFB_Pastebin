import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import { useParams } from "react-router-dom";
import { PASTE_BY_ID } from "../../GraphQL/Queries";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Form, Button, Icon} from 'semantic-ui-react';

import { useNavigate } from "react-router-dom";
import { useForm } from '../util/hooks'
import { CREATE_PASTE_REPORT} from '../../GraphQL/Mutations';






function ReportPaste() {
    const navigate = useNavigate();
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
    
    
    
    
    
    
    
    let note, reason
    const [reportPaste] = useMutation(CREATE_PASTE_REPORT, {
        onCompleted(){
          navigate('/paste/' + pastes.id)
        }
        });
        
        
    return (
      <>
        <h1 className="title">Report</h1>
        <div className="outer-box report-box">
        <form  onSubmit={(e) => {
          e.preventDefault()
          reportPaste({
            variables: {
              note: note.value,
              reason: reason.value,
              copyId: pastes.id
            },
          });
        }}
        >
          <label>note:</label>
          <br/>
          <select ref={(value) => (reason = value)}>
          <option value="us">Unspecified</option>
          <option value="hs">Hate speach</option>
          <option value="rc">Racism</option>
          <option value="pl">Plagiarism</option>
          </select>
          <br/>
          <br/>
          <textarea
          placeholder="note"
          name="note"
          type="textarea"
          ref={(value) => (note = value)}
          rows="5"
          columns="50"
          />
          
          <div className='inner-box'>
        <button className="paste-link-btn" type="submit" primary>
          Report
        </button>
        </div>
      </form>
          </div>
      </>
    );
}


export default ReportPaste;