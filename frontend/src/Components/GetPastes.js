import React, {useEffect, useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import {LOAD_PASTES} from '../GraphQL/Queries'
import './GetPastes.css'


const tempVal = [
    {
      id: 1,
      author:'txapmle1',
      title: "test",
      type: "ASCII",
      creation_date: 'wczoraj',
    },
    {
        id: 2,
        author:'txapmle2',
        title: "test",
        type: "ASCII",
        creation_date: 'wczoraj',
    },
    {
        id: 3,
        author:'txapmle3',
        title: "test",
        type: "ASCII",
        creation_date: 'dzisiaj',
    },
    {
        id: 4,
        author:'txapmle4',
        title: "Go to Market",
        type: "ASCII",
        creation_date: 'dzisiaj',
    },
  ];


function GetPastes(){

    // const {error, loading, data} = useQuery(LOAD_PASTES)

    // useEffect(() => {
    //     console.log('loading:', loading)
    //     console.log('Error:', error)
    //     console.log('Pastes:', data)
    // }, [data, loading, error])

    // loading ? (
        //     <p>Loading...</p>
        return(
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
        {tempVal.map((val) => {
            return (
                <tr>
                    <td> {val.title}</td>
                    <td> {val.author}</td>
                    <td> {val.type}</td>
                    <td> {val.creation_date}</td>
                </tr>)})}
            </tbody>
        </table>
    </div>
    );
}


export default GetPastes;