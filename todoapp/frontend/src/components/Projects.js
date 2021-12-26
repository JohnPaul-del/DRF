import React from 'react';
import {Link} from 'react-router-dom';

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.project_id}`}>{project.name}</Link></td>
            <td><Link to={`${project.project_users}`}>{project.project_users}</Link></td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
           <th>Project Name</th>
           <th>Project Users</th>
           <tbody>
                {projects.map((project)=> <ProjectItem project={project} />)}
           </tbody>

       </table>
    )
}

export default ProjectList;