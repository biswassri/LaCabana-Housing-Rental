import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { pretifyDate, toUpperCase } from "../helpers";

const PendingBookings = (props) => {
  const { booking, fromUser,status="pending" } = props.pendingPayment;
  const { days, endAt, guests, startAt, totalPrice } = booking;
  const { email, username } = fromUser;

  return (
    /**
     * Card layout for pending bookings
     */
    <div className="col-xs-6 col-md-4 rental-card">
      <Card style={{ width: "18rem" }}>
        <Card.Link>
          <Card.Img variant="top" src="/assets/Bedroom.jpg" />
          <Card.Body>
            <Card.Title className="color-card">
              Made by: {toUpperCase(username)}
            </Card.Title>
            <Card.Title className="color-card">
              Price: {totalPrice}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Status: {toUpperCase(status)}
            </Card.Subtitle>
            <Card.Subtitle className="color-card">
              Start: {pretifyDate(startAt)} <br></br> End: {pretifyDate(endAt)}
            </Card.Subtitle>
            <Card.Text className="color-card">
              Guests: {guests} <br></br>
              Cost: {totalPrice} <br></br>
              Days: {days} <br></br>
            </Card.Text>
          </Card.Body>
          {
            status === "pending" && <Card.Footer>
              <button type="button" onClick={()=>props.acceptPayment(props.pendingPayment)} className="btn btn-secondary">Accept</button>
              {"  "}
              <button type="button" onClick={()=>props.declinePayment(props.pendingPayment)} className="btn btn-danger">Decline</button>
            </Card.Footer>
          }
          
        </Card.Link>
      </Card>
    </div>
  );
};

export default PendingBookings;
