import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { toast } from "react-toastify";
import { getRangeOfDates, dateToUTC } from "../../helpers";
import BookingModal from "./bookingModal";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.dateRef = React.createRef();
    this.bookedOutDates = [];

    this.state = {
      startAt: "",
      endAt: "",
      guests: "",
      openModal: false
    };

    this.checkInvalidDate = this.checkInvalidDate.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.onSuccessfulBooking = this.onSuccessfulBooking.bind(this);
  }

  componentDidMount() {
    this.bookedOutDates = this.getBookedOutDates();
    console.log(this.props.rental);
  }

  getBookedOutDates() {
    const offDaysArr = [];
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const bookedInterval = getRangeOfDates(booking.startAt, booking.endAt);
        offDaysArr.push(...bookedInterval);
      });
    }
    return offDaysArr;
  }
  checkInvalidDate(date) {
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  }

  handleApply(event, picker) {

    const sStartDate = picker.startDate.format("Y/MM/DD");
    const sEndDate = picker.endDate.format("Y/MM/DD");
    const startAt = dateToUTC(sStartDate);
    const endAt = dateToUTC(sEndDate);

    //this.dateRef.current.value = `${sStartDate}to${sEndDate}`;

    this.setState({ startAt, endAt });
  }

  addGuests(event) {
    this.setState({ guests: parseInt(event.target.value, 10) });
  }
  confirmReservation() {
    this.setState({ openModal: true });
  }
  closeConfirmation() {
    this.setState({ openModal: false });
    this.resetData();
  }
  resetData() {
   // this.dateRef.current.value = "";
    this.setState({ starttAt: "", endAt: "", guests: "" });
  }
  onSuccessfulBooking() {
    const { startAt, endAt } = this.state;
    const bookedInterval = getRangeOfDates(startAt, endAt);
    this.bookedOutDates.push(...bookedInterval);
    this.closeConfirmation();
    toast.success("Booking has been successfuly created!");
  }

  render() {
      console.log("THISSSS", this.props)
    const { rental, isAuth } = this.props;
   
    const { startAt, endAt, guests, openModal } = this.state;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const totalPrice = 100;
    return (
      <div className="booking">
        <h3 className="booking-price">
           $ 100
          <span className="booking-per-night">per night</span>
        </h3>
        <hr />
        {!isAuth && (
          <Link
            className="btn btn-bwm btn-confirm btn-block"
            to={{ pathname: "/login" }}
          >
            Login to book a place
          </Link>
        )}
        {isAuth && (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                onApply={this.handleApply}
                isInvalidDate={this.checkInvalidDate}
                opens="right"
                containerStyles={{ display: "block" }}
              >
                <input
                  id="dates"
                  type="text"
                  className="form-control"
                />
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                onChange={event => this.addGuests(event)}
                value={this.state.guests}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
            <button
              disabled={!startAt || !endAt || !guests}
              onClick={() => this.confirmReservation()}
              className="btn btn-bwm btn-confirm btn-block"
            >
              Reserve place now
            </button>
          </React.Fragment>
        )}
        <hr />
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          startAt={startAt}
          endAt={endAt}
          days={days}
          guests={guests}
        totalPrice={totalPrice}
          rentalId={rental.id}
          open={openModal}
          closeModal={this.closeConfirmation}
          onBooked={this.onSuccessfulBooking}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
   
  return {
    rentals: state.rentals.data,
    isAuth: state.user.isLogin
   
  };
};
export default connect(mapStateToProps)(Booking);