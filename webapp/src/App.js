import './dist/App.css';
import React, { Component } from 'react';
import Header from './components/nav';
import Footer from './components/footer';


class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="page-container">
        <div className="content-wrap">
          <Header /> 
          <Footer />
        </div>
      </div>
   
    );
  }
}
 
export default App;
