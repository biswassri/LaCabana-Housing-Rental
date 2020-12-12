import './dist/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Register from './components/login-container/Register';
import Home from './components/Home';
import TenantView from './components/Tenants';
import RoomDetails from './components/DetailView';
import Login from './components/login-container/Login';


class App extends Component {
  state = {}
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/room' component={RoomDetails} />

              {/* Add additional routes above*/}
              {/* Handled routes which aren't registered and direct it to home*/}
              <Route path="*" >
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
