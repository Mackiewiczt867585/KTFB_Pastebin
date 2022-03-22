import React, {useEffect, useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import {LOAD_PASTES} from '../GraphQL/Queries'
import './GetPastes.css'




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
                    <td> {val.creationDate}</td>
                </tr>)})}
            </tbody>
        </table>
    </div>
    );
}


export default GetPastes;