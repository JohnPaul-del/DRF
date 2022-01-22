import React from 'react';
import {Link} from 'react-router-dom';

const KanbanItem = ({kanban}) => {
    if (kanban.is_active) {
    return (
        <tr>
            <td>{kanban.project}</td>
            <td>{kanban.creator}</td>
            <td>{kanban.element_title}</td>
            <td>{kanban.element_description}</td>
            <td>{kanban.element_status}</td>
        </tr>
    )
    }
    return ""
}

const KanbanList = ({kanbans, deleteKanban}) => {
    return (
        <table>
           <th>Project ID</th>
           <th>Creator ID</th>
           <th>Name</th>
           <th>Description</th>
           <th>Status</th>
           <tbody>
                {kanbans.map((kanban)=> <KanbanItem kanban={kanban} deleteKanban={deleteKanban} />)}
           </tbody>
           <Link to='/kanban/create'>Create</Link>
       </table>

    )
}

export default KanbanList;