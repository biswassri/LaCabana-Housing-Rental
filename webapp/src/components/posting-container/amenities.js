import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCube, faDesktop, faHandsWash, faLocationArrow, faSink, faThermometer, faTimes, faWalking } from '@fortawesome/free-solid-svg-icons'


/**
 * Amenities included in each Rental posting
 */
const PostingAmenities= () => {
  return (
    
    <div className="rental-assets">
      <h3 className="title">Assets</h3>
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <span>
            <FontAwesomeIcon icon={faAsterisk}/> Cooling
          </span>
          <span>
          <FontAwesomeIcon icon={faThermometer}/>  Heating
          </span>
          <span>
          <FontAwesomeIcon icon={faLocationArrow}/>  Iron
          </span>
        </div>
        <div className="col-md-6 d-flex flex-column mb-2">
          <span>
          <FontAwesomeIcon icon={faDesktop}/>  Working area
          </span>
          <span>
          <FontAwesomeIcon icon={faCube}/>Washing machine
          </span>
          <span>
          <FontAwesomeIcon icon={faSink}/>Dishwasher
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostingAmenities;