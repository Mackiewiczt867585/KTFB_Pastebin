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
    
    
    
    
    
    
    
    const { onChange, onSubmit, values } = useForm(reportPasteCallback, {
        copyId: pastes.id,
        note:'',
        reason:'',
    });
    values.copyId = pastes.id
    const [reportPaste] = useMutation(CREATE_PASTE_REPORT, {
        update(
            _,
            )
            {
                navigate('/');
            },
            variables: values
        });
        
        
        
        
        function reportPasteCallback(){
      reportPaste();
    }
    return (
      <>
        <h1 className="title">Report</h1>
        <div className="outer-box">
        <Form onSubmit={onSubmit} noValidate>
          <Form.Input
          label="reason:"
          placeholder="reason"
          name="reason"
          type="text"
          value={values.reason}
          onChange={onChange}
          />
          <br/>
          <label>note:</label>
          <br/>
          <textarea
          placeholder="note"
          name="note"
          type="textarea"
          value={values.note}
          onChange={onChange}
          rows="5"
          columns="50"
          />
          
          <div className='inner-box'>
        <Button type="submit" primary>
          Report
        </Button>
        </div>
      </Form>
          </div>
      </>
    );
}


export default ReportPaste;