import React from 'react'
import {useParams} from 'react-router-dom'

import UsersItem from './Appusers.js'
import ProjectItem from './Projects.js'
import KanbanItem from './Kanban.js'


const ProjectDetail = ({projects, appusers, kanbans}) => {

    let {id} = useParams();
    let filtered_projects = projects.filter((item) => item.id === id)
    let filtered_kanbans = kanbans.filter((item) => item.project === id)
    let filtered_appusers = appusers.filter(appuser => filtered_projects[0].appusers.include(parseInt(appuser.id)))

    return (
        <div>
        <h1>Project</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered_projects.map((projects)=> <ProjectItem projects={projects} appusers={appusers} />)}
                </tbody>
            </table>

            <h1>Kanban</h1>
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Creator</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered_kanbans.map((kanban)=> <KanbanItem kanban={kanban}/>)}
                </tbody>
            </table>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered_appusers.map((appuser)=> <UsersItem appuser={appuser}/>)}
                </tbody>
            </table>

        </div>
    )
}

export default ProjectDetail;