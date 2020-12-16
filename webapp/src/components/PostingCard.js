import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const PostingCard = (props) => {
  const rental = props.rental;
  const city = props.city;
  const cardLinkHref = `/room/${rental.city}/${rental._id}`;

  return (
    <div className="col-xs-6 col-md-4 rental-card">
      <Card style={{ width: "18rem" }}>
        <Card.Link href={cardLinkHref}>
          <Card.Img variant="top" src="/assets/Bedroom.jpg" />
          <Card.Body>
            <Card.Title>{rental.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {rental.shared ? "Shared" : "Whole"} {rental.category} &#183;
              {rental.city}
            </Card.Subtitle>
            <Card.Text>${rental.dailyRate} &#183; Free cancellation!</Card.Text>
          </Card.Body>
        </Card.Link>
      </Card>
    </div>
  );
};

export default PostingCard;
