import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import UsersList from './components/Appusers.js'
import ProjectList from './components/Projects.js'
import KanbanList from './components/Kanban.js'
import ProjectDetail from './components/ProjectDetail.js'
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
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/appusers/')
       .then(response => {
           const appusers = response.data.results
               this.setState(
               {
                   'appusers': appusers
               }
           )
       }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/project/')
       .then(response => {
           const projects = response.data.results
               this.setState(
               {
                   'projects': projects
               }
           )
       }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/kanban/')
       .then(response => {
           const kanbans = response.data.results
               this.setState(
               {
                   'kanbans': kanbans
               }
           )
       }).catch(error => console.log(error))
}

    render() {
        return (
        <div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={() => <ProjectList projects={this.state.projects}/>}/>
                <Route exact path='/kanban' component={() => <KanbanList kanbans={this.state.kanbans}/>}/>
                <Route exact path='/appusers' component={() => <UsersList appusers={this.state.appusers}/>}/>
                 <Route exact path='/project/:id'>
                    <ProjectDetail projects={this.state.projects} appusers={this.state.appusers} kanbans={this.state.kanbans} />
                </Route>
                <Redirect from='/projects' to='/'/>
                <Route component={NotFound404}/>

            </Switch>

        </BrowserRouter>
        </div>
        )
    }

}




//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}

export default App;
