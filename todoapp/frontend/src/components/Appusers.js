import React from 'react';

const UsersItem = ({appuser}) => {
    return (
        <tr>
            <td>
                {appuser.username}
            </td>
            <td>
                {appuser.first_name}
            </td>
            <td>
                {appuser.last_name}
            </td>
            <td>
                {appuser.email}
            </td>
        </tr>
    )
}

const UsersList = ({appusers}) => {
    return (
        <table>
           <th>
               Login
           </th>
           <th>
               First Name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Email
           </th>
           <tbody>
                {appusers.map((appuser)=> <UsersItem appuser={appuser} />)}
           </tbody>
       </table>


    )
}

export default UsersList;