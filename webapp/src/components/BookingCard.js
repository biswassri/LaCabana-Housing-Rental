import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { pretifyDate, toUpperCase } from "../helpers";

const BookingCard = (props) => {
  const { days=0, endAt='', guests=0, startAt='', status='', totalPrice=0 } = props.booking;

  return (
    <div className="col-xs-6 col-md-4 rental-card">
      <Card style={{ width: "18rem" }}>
        <Card.Link>
          <Card.Img variant="top" src="/assets/Bedroom.jpg" />
          <Card.Body>
            <Card.Title className="color-card">
              Start: {pretifyDate(startAt)} <br></br> End: {pretifyDate(endAt)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Status: {toUpperCase(status)}
            </Card.Subtitle>
            <Card.Text className="color-card">
              Guests: {guests} <br></br>
              Cost: {totalPrice} <br></br>
              Days: {days} <br></br>
            </Card.Text>
          </Card.Body>
        </Card.Link>
      </Card>
    </div>
  );
};

export default BookingCard;
