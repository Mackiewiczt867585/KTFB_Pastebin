import React from 'react';
import './Table.css'
function Table () {
    return (
    <>
    <div className='table-box'>
            <table>
                <tr>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th>Język</th>
                    <th>Dodano</th>
                </tr>
                <tr>
                    <td>Example title</td>
                    <td>Example</td>
                    <td>exapmle</td>
                    <td>exapmle</td>
                </tr>
            </table>
        </div>
        </>

    )
}

export default Table;
