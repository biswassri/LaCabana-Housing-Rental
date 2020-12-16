import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import Search from "./search";

class Slider extends Component {
  state = {};
  render() {
    /**
     * Bootstrap Carousel component
     */
    return (
      <div>
        <Carousel className="image-slider">
          <Carousel.Item interval={5000} className="image-slider-item">
            <img
              className="d-block w-100 h-100 image-container"
              src="/assets/slider/Friends.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Friends Like Family!</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000} className="image-slider-item">
            <img
              className="d-block w-100 h-100 image-container"
              src="/assets/slider/LivingRoom.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1>Live it Up! Live it Large!</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000} className="image-slider-item">
            <img
              className="d-block w-100 h-100 image-container"
              src="/assets/slider/Skyline.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h1>Find great places and like minded people!</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Slider;
