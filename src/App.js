import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import Login from '../src/components/auth/login/Login';
import Signup from "./components/auth/signup/Signup";

function App() {
    return (
        <Router>
            <div className="App">
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>Login</Link></li>
                <li><Link to='/topics'>Signup</Link></li>
              </ul>

              <Route path='/' component={App} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
            </div>
        </Router>
    );
}

export default App;
