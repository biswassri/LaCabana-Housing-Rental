import React, { Component } from "react";
import ReactPlayer from "react-player";

class VideoContainer extends Component {
  state = {};
  render() {
    return (
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
          <button class="btn btn-secondary" type="button">
                        + ADD LISTINGS
          </button>
        </div>
      </div>
    );
  }
}

export default VideoContainer;
