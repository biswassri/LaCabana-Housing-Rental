import React from "react";
import { connect } from "react-redux";

import  RentalAssets from "./amenities";


const PostingDetailInfo = ({ rental }) => {
  console.log(rental);
   return (
     <div>
        <div className="rental">
        
        <div className="d-flex justify-content-between">
       
          <h2 className={`rental-type ${rental.category}`}>
            {rental.shared ? "shared " : "entire"} {rental.category}
          </h2>
          <div className="rental-owner">
            <img
              src="/assets/ava.png"
              alt="owner"
            />
            <span>{rental.user && rental.user.username}</span>
          </div>
        </div>
  
        <h1 className="rental-title">{rental.title}</h1>
        <h2 className="rental-city">{rental.city}</h2>
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building" />
            {rental.bedrooms} bedrooms
          </span>
          <span>
            <i className="fa fa-user" /> {rental.bedrooms + 4} guests
          </span>
          <span>
            <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
          </span>
        </div>
        <p className="rental-description">{rental.description}</p>
        <hr />
        <RentalAssets />
      </div>
      </div>
    );
     
   
};

export default PostingDetailInfo;