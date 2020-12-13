import React, { Component } from 'react';
import Header from './nav';
import Footer from './footer';
import Slider from './slider';
import CityCards from './citycard';
import VideoContainer from './video-container';

class Home extends Component {
  state = {}
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

export default Home;