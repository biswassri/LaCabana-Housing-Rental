import './dist/App.css';
import React, { Component } from 'react';
import Header from './components/nav';
import Footer from './components/footer';
import Slider from './components/slider';
import CityCards from './components/citycard';
import VideoContainer from './components/video-container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import registerUser from './components/login-container/Register';
import Home from './components/Home';
import TenantView from './components/Tenants';
import RoomDetails from './components/DetailView';


class App extends Component {
  state = {}
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          {/* <Router>
            <Switch>
              <Route path='/' component={registerUser} />
              <Route path='/Home' component={Home} />
            </Switch>
          </Router> */}
          {/* <RoomDetails /> */}
          <Home />
        </div>
      </div>



    );
  }
}

export default App;
