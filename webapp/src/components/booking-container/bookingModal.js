import React, { Component } from "react";
import {Modal} from "react-bootstrap";
import { createBooking } from "../../actions";
import ResError from "../shared/form/ResError";


class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentToken: "",
      errors: []
    };

    this.setPaymentToken = this.setPaymentToken.bind(this);
  }

  handleReservation() {
    const { open, onBooked, ...booking } = this.props;
    const { paymentToken } = this.state;
    createBooking({ ...booking, paymentToken: paymentToken })
      .then(onBooked)
      .catch(errors => {
        this.setState({ errors });
      });
  }

  resetErrors() {
    this.setState({ errors: [] });
  }

  setPaymentToken(paymentToken) {
    this.setState({ paymentToken });
  }

  render() {
    const {
      startAt,
      endAt,
      days,
      guests,
      dailyRate,
      rentalId,
      open,
      closeModal
    } = this.props;
    const { paymentToken } = this.state;
    console.log("Trial",dailyRate);
    return (
      <Modal
        show={open}
        onHide={closeModal}
        onExit={() => this.resetErrors()}
      >
        <Modal.Header closeButton>
        <Modal.Title>Confirm Booking</Modal.Title>
        <p className="dates">
          {startAt} / {endAt}
        </p>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-body">
          <em>{days}</em> nights <em> {dailyRate}</em> per Night
          <p>
            Guests: <em>{guests}</em>
          </p>
          <p>
            Price: <em>{days * 40}</em>
          </p>
          <p>Do you confirm your booking for selected days?</p>
        </div>
        
        <ResError errors={this.state.errors}/>
        <div className="modal-footer">
        <button
            disabled={
              (this.state.errors && this.state.errors.length > 0)
            }
            type="button"
            className="btn btn-bwm"
            onClick={() => this.handleReservation()}
          >
            Confirm
          </button>
          <button type="button" onClick={closeModal} className="btn btn-bwm">
            Cancel
          </button>
        </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default BookingModal;
