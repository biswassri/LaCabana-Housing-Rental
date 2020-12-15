import React, { Component } from 'react';
import { Carousel } from "react-bootstrap";

class ImageSlider extends Component {
    state = {  }
    render() { 
        return ( 
        <div>
            <Carousel className="image-slider">
              <Carousel.Item interval={5000} className="image-slider-item">
                <img
                  className="d-block w-100 h-100 image-container"
                  src="/assets/slider/Friends.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={5000} className="image-slider-item">
                <img
                  className="d-block w-100 h-100 image-container"
                  src="/assets/slider/LivingRoom.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={5000} className="image-slider-item">
                <img
                  className="d-block w-100 h-100 image-container"
                  src="/assets/slider/Skyline.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div> );
    }
}
 
export default ImageSlider;