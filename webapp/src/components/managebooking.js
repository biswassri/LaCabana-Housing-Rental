import React, { Component } from "react";
import Footer from "./footer";
import Header from "./nav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserBookings } from "../actions/booking.action";
import BookingCard from "./BookingCard";

class ManageBooking extends Component {
  state = {
    pendingPayments: [],
  };
  componentDidMount() {
    this.props.fetchUserBookings();
  }
  renderBookings(bookings) {
    return bookings.map((booking) => (
      <BookingCard key={booking._id} booking={booking} />
    ));
  }

  render() {
    // const { booking, errors, isFetching } = this.props.bookings;
    // const { pendingPayments } = this.state;

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
          {/* <section id="userBookings">
            <h4 className="page-title">My Bookings</h4>
            <div className="row">{this.renderBookings(booking)}</div>
            {!isFetching && errors.length === 0 && booking.length === 0 && (
              <div className="alert alert-warning">
                You have no bookings created go to rentals section and book your
                place today.
                <Link
                  style={{ marginLeft: "10px" }}
                  className="btn btn-bwm"
                  to="/postings/"
                >
                  Available Rental
                </Link>
              </div>
            )}
          </section>
          <section id="userPendingBookings">
            <h1 className="page-title">My Pending Bookings</h1>
            <div className="row">{this.renderPayments(pendingPayments)}</div>
            {!isFetching &&
              errors.length === 0 &&
              pendingPayments.length === 0 && (
                <div className="alert alert-warning">
                  You have no pending bookings currently...
                </div>
              )}
          </section> */}
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
