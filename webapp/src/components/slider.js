import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class Slider extends Component {
  state = {};
  render() {
    return (
      <Carousel className="image-slider">
        <Carousel.Item interval={5000} className="image-slider-item">
          <img
            className="d-block w-100 h-100 image-container"
            src="/assets/Friends.jpg"
            alt="First slide"
          />
          <Carousel.Caption >
              <h1>Friends Like Family!</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000} className="image-slider-item">
          <img
            className="d-block w-100 h-100 image-container"
            src="/assets/LivingRoom.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
              <h1>Live it Up! Live it Large!</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000} className="image-slider-item">
          <img
            className="d-block w-100 h-100 image-container"
            src="/assets/Skyline.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
              <h1>Find great places and like minded people!</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Slider;
