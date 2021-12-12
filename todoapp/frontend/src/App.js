import React from 'react';
import UsersList from './components/Appusers.js'
import axios from 'axios';
//import logo from './logo.svg';
//import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'appusers': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/apiappusers/')
       .then(response => {
           const appusers = response.data
               this.setState(
               {
                   'appusers': appusers
               }
           )
       }).catch(error => console.log(error))
}




    render() {
        return (
        <div>
            <UsersList appusers={this.state.appusers} />
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
