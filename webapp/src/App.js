import './dist/App.css';
import React, { Component } from 'react';
import Header from './components/nav';
import Footer from './components/footer';
import Slider from './components/slider';
import Search from './components/search';
import CityCards from './components/citycard';
import VideoContainer from './components/video-container';


class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="page-container">
        <div className="content-wrap">
          <Header /> 
          <Slider />
          <CityCards/>
          <VideoContainer />
          <Footer />
        </div>
      </div>
   
    );
  }
}
 
export default App;
