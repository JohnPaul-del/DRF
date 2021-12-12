import React from 'react';

const UsersItem = ({appuser}) => {
    return (
        <tr>
            <td>
                {appuser.user_login}
            </td>
            <td>
                {appuser.first_name}
            </td>
            <td>
                {appuser.last_name}
            </td>
            <td>
                {appuser.user_email}
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
           {appusers.map((appuser) => <UsersItem appuser={appuser} />)}
       </table>

    )
}

export default UsersList