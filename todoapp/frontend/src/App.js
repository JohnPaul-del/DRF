import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import UsersList from './components/Appusers.js'
import ProjectList from './components/Projects.js'
import KanbanList from './components/Kanban.js'
import Kanban_graphql from './components/Kanban_graphql.js'
import ProjectDetail from './components/ProjectDetail.js'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie'
//import logo from './logo.svg';
//import './App.css';

const NotFound404 = ({location}) => {
    return(
        <div>
            <h1>Not Found {location.pathname}</h1>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'appusers': [],
            'projects': [],
            'kanbans': [],
            'kanbans_graphql': [],
            'token': '',

        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({token: token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {
                username: username,
                password: password
            })
            .then(response => {
                this.set_token(response.data['token'])
                console.log(this.state.token)
            })
            .catch(error => alert('Wrong username or password'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'};
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios
            .get('http://127.0.0.1:8000/api/users', {headers})

            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({users: []})
            })


        axios
            .get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))


        axios
            .get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))

             axios
                .get('http://127.0.0.1:8000/graphql/?query={allTodos {id text isActive project {name} user {username}}}', {headers})
                .then(response => {
                    const todos_graphql = response.data.data.allTodos
                    this.setState(
                        {
                            'todos_graphql': todos_graphql
                        }
                    )
                })
                .catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (


        <div>
        <BrowserRouter>
            {this.is_authenticated() ?
            <button onClick={() => this.logout()}>Logout</button> :
            <Link to='/login'>Login</Link>
        }
            <Switch>

                <Route exact path='/' component={() => <ProjectList projects={this.state.projects}/>}/>
                <Route exact path='/kanban' component={() => <KanbanList kanbans={this.state.kanbans}/>}/>
                <Route exact path='/appusers' component={() => <UsersList appusers={this.state.appusers}/>}/>
                <Route exact path='/kanbans_graphql' component={() => <Kanban_graphql kanbans={this.state.kanbans_graphql}/>}/>
                <Route exact path='/project/:id'>
                   <ProjectDetail projects={this.state.projects} appusers={this.state.appusers} kanbans={this.state.kanbans} />
                <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                </Route>
                <Redirect from='/projects' to='/'/>
                <Route component={NotFound404}/>

            </Switch>

        </BrowserRouter>
        </div>
        )
    }

}

export default App;
