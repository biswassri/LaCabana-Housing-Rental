import React, { Component } from "react";
import Footer from "./footer";
import Header from "./nav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserBookings, getPendingPayments, acceptPayment, declinePayment } from "../actions/booking.action";
import BookingCard from "./BookingCard";
import PendingBookings from "./PendingBookings";
import { Container, Row } from "react-bootstrap";

class ManageBooking extends Component { 
  state = {
    pendingPayments: [],
  };
  componentDidMount() {
    this.props.fetchUserBookings();
    this.getPendingPayments();
  }
  renderBookings = (bookings) => {
    return bookings.map((booking) => (
      <BookingCard key={booking._id} booking={booking} />
    ));
  };
  renderPendingBookings = (pendingPayments) => {
    return pendingPayments.map((pendingPayment) => (
      <PendingBookings key={pendingPayment._id} pendingPayment={pendingPayment} declinePayment={this.declinePayment} acceptPayment={this.acceptPayment} />
    ));
  };

  declinePayment = (payment) => {
    declinePayment(payment)
        .then(data => {
            this.props.fetchUserBookings();
            this.getPendingPayments();
        })
        .catch(err =>  this.getPendingPayments());
  }
  acceptPayment = (payment) => {
    acceptPayment(payment)
        .then(data => {
            this.props.fetchUserBookings();
            this.getPendingPayments();
        })
        .catch(err => this.getPendingPayments());
  }

  getPendingPayments() {
    getPendingPayments()
      .then(pendingPayments => {
          console.log(pendingPayments)
        this.setState({ pendingPayments });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { bookings = {} } = this.props;
    const { data = [] } = bookings;
    const { pendingPayments=[]} = this.state

    return (
      <div className="page-container">
        <div
          className="content-wrap"
          style={{
            background: "linear-gradient(#f5992a, #f0716f)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          <Header />
          <Container>
            <h3 className="text-light">My Bookings</h3>
            <Row>{this.renderBookings(data)}</Row>
            { data.length === 0 && <h5 className="text-light">You have no bookings.</h5> }
            <h3 className="text-light">My Pending Bookings</h3>
            <Row>{this.renderPendingBookings(pendingPayments)}</Row>
            { pendingPayments.length === 0 && <h5 className="text-light">You have no pending bookings.</h5> }
          </Container>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { bookings: state.bookings };
};
export default connect(mapStateToProps, { fetchUserBookings })(ManageBooking);
