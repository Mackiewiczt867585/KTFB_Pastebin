import React, {useEffect, useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import {LOAD_PASTES} from '../GraphQL/Queries'
import './GetPastes.css'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
TimeAgo.addDefaultLocale(en)


function GetPastes(){

    const {error, loading, data} = useQuery(LOAD_PASTES);
    const [ pastes, setPastes ] = useState([]);
    useEffect(() => {
        console.log('loading:', loading)
        console.log('Error:', error)
        console.log('Pastes:', data)
        if (data){
        setPastes(data.allCopies);
        }
    }, [data, loading, error]);



    if (loading) return <p>Loading...</p>;
    if (data) return(
        <div className='table-box'>
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
        {pastes.map((val, pos) => {
            return (
                <tr key={pos}>
                    <td> {val.title}</td>
                    <td> {val.author}</td>
                    <td> {val.type}</td>
                    <td> <ReactTimeAgo date={val.creationDate} locale='en-US'/></td>
                </tr>)})}
            </tbody>
        </table>
    </div>
    );
}


export default GetPastes;