import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const PostingCard = (props) => {
  const rental = props.rental;
  return (
    <div className="col-xs-6 col-md-4 rental-card">
      <Card style={{ width: "18rem" }}>
        <Card.Link href="/">
          <Card.Img variant="top" src="/assets/Bedroom.jpg" />
          <Card.Body>
            <Card.Title className="color-card">{rental.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {rental.shared ? "Shared" : "Whole"} {rental.category} &#183;
              {rental.city}
            </Card.Subtitle>
            <Card.Text className="color-card">${rental.dailyRate} &#183; Free cancellation!</Card.Text>
          </Card.Body>
        </Card.Link>
      </Card>
    </div>
  );
};

export default PostingCard;
