import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from './nav';
import Footer from './footer';
import Slider from './slider';
import CityCards from './citycard';
import VideoContainer from './video-container';

class Home extends Component {
  state = {}
  componentDidMount(){
    console.log("USER_STORE::::", this.props.user)
  }
  render() {
    return (
        <div className="page-container">
          <div className="content-wrap">
            <Header />
            <Slider />
            <CityCards />
            <VideoContainer />
            <Footer />
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect( mapStateToProps)(Home);