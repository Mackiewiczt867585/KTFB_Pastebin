import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import { useParams } from "react-router-dom";
import { PASTE_BY_ID } from "../../GraphQL/Queries";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Form, Button, Icon} from 'semantic-ui-react';


import { useForm } from '../util/hooks'
import { EDIT_PASTE } from '../../GraphQL/Mutations';






function EditPaste() {
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
    
    
    
    
    
    
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(editPasteCallback, {
        id: pastes.id,
        author:'',
        title: '',
        content: ''
    });
    values.id = pastes.id
    const [editPaste] = useMutation(EDIT_PASTE, {
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
  });


  
  
  function editPasteCallback(){
      editPaste();
    }
    return (
      <>
        <h1 className="title">Wklejka</h1>
        <div className="outer-box">
      <Form onSubmit={onSubmit} noValidate>
      <Form.Input
          label="author:"
          placeholder="author.."
          name="author"
          type="text"
          value={values.author}
          onChange={onChange}
          />
          <Form.Input
          label="title:"
          placeholder="title.."
          name="title"
          type="text"
          value={values.title}
          onChange={onChange}
          />
            <h1>content:</h1>
          <Form.Input
          label="content:"
          placeholder="content.."
          name="content"
          type="text"
          value={values.content}
          onChange={onChange}
          />
          <div className='inner-box'>
        <Button type="submit" primary>
          Edit
        </Button>
        </div>
      </Form>
          </div>
      </>
    );
}


export default EditPaste;