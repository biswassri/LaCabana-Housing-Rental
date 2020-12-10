import React, { Component } from "react";
import Header from "./nav";
import Footer from "./footer";
import ImageSlider from "./detail-container/image-slider";

class RoomDetails extends Component {
  state = {};
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <ImageSlider />

          <div className="roomDetails">
            <h1>Room Available - </h1>
            <button className="btn btn-secondary" type="button">
              Location
            </button>
            <h2>Unit 27, Boylston Street</h2>
            <p>Minimum Stay</p>
            <p>Value</p>
            <p>Available Date</p>
            <p>Value</p>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default RoomDetails;
