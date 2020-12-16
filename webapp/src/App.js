import './dist/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { connect } from "react-redux";

import Register from './components/login-container/Register';
import Home from './components/Home';
import TenantView from './components/Tenants';
import DetailList from './components/DetailView';
import Login from './components/login-container/Login';
import CreatePosting from './components/CreatePostinglForm';


class App extends Component {
  state = {}
  render() {
    const { user = {}} = this.props;
    const { username , isLogin = false} = user
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/room/:city' 
                render={(props) => {
                  if(isLogin){
                    return <DetailList {...props}/>
                  }else{
                    return <Redirect to="/login"/>
                  }
                }} 
              />
              <Route exact path='/postings/new' component={CreatePosting} />
              <Route exact path='/user/:id' component={UserProfile} />
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
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect( mapStateToProps)(App);