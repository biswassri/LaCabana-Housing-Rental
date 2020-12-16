import React, { Component } from "react";
import ReactPlayer from "react-player";

class VideoContainer extends Component {
  state = {};
  render() {
    return (
      /**
       * React PLayer video rendering componets
       */
      <div
        className="video-background"
        style={{ backgroundImage: `url("assets/Bedroom.jpg")` }}
      >
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            width="70%"
            height="60%"
          />
          <button className="btn btn-secondary" type="button">
                        READ MORE
          </button>
        </div>
      </div>
    );
  }
}

export default VideoContainer;
