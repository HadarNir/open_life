import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import Login from './components/auth/login/Login';
import Signup from "./components/auth/signup/Signup";

function App() {
    return (
        <Router>
            <div className="App">
              <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
              </ul>

              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
            </div>
        </Router>
    );
}

export default App;
