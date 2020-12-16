import React, { Component } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import { Card } from "react-bootstrap";
// import ManageRentalView from './ManageRentalView'

class ManagePostingCard extends Component {
    constructor(props) {
        super(props);
        this.state = { wantDelete: false };
      }

  showDeleteMenu() {
    this.setState({ wantDelete: true });
  }
  hideDeleteMenu() {
    this.setState({ wantDelete: false });
  }
  deleteRental(rentalId) {
    this.hideDeleteMenu();
    this.props.deleteRentalCb(rentalId);
  }
  render(){
  const rental = this.props.rental;
  const city = this.props.city;

  const { wantDelete } = this.state;
  const cardLinkHref = `/room/${rental.city}/${rental._id}`;

  return (
    <div className="col-xs-6 col-md-4 rental-card">
      <Card style={{ width: "18rem", paddingBottom: "10px", paddingTop: "10px" }}>
        <Card.Link href={cardLinkHref}>
          <Card.Img variant="top" src="/assets/Bedroom.jpg" />
          <Card.Body>
            <Card.Title className="color-card">{rental.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {rental.shared ? "Shared" : "Whole"} {rental.category} &#183;
              {rental.city}
            </Card.Subtitle>
            <Card.Text className="color-card" > Click to go to Rental</Card.Text>
            </Card.Body>
            </Card.Link>
            <Card.Body style={{backgroundColor: "lightgrey"}} >
                <Card.Subtitle>Created on {moment(rental.createdAt).format("MMM Do YYYY")}</Card.Subtitle>
                {!wantDelete && (<React.Fragment>
                  <button
                    onClick={() => this.showDeleteMenu()}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-warning text-white ml-2"
                    to={{
                      pathname: `/rentals/${rental._id}`,
                      state: { isUpdate: true }
                    }}
                  >
                    Edit
                  </Link>
                </React.Fragment>)}

                {wantDelete && (
              <React.Fragment>
                <p className="my-2">
                  Do you really want to delete this property?
                </p>
                <button
                  onClick={() => this.deleteRental(rental._id)}
                  className="btn btn-danger mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => this.hideDeleteMenu()}
                  className="btn btn-success"
                >
                  No
                </button>
              </React.Fragment>
            )}
            </Card.Body>
      </Card>
    </div>
  );
}
}

export default ManagePostingCard;
