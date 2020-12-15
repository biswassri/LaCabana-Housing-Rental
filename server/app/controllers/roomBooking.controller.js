
import errorHandler from '../handlers/errorhandler';
import RoomBookingService from '../services/roomBooking.service';

const CUSTOMER_SHARE = 0.8;

const getUserBookings = (req, res, next) => {
    RoomBookingService.getUserBookings(req,res)
    .then(booking => booking ? res.json(booking) : res.sendStatus(422))
    .catch(err => res.status(422).send({ errors: errorHandler(err.errors) }));
}

const createBooking = (req, res, next) => {
    RoomBookingService.getUserBookings(req,res)
    .then(booking => {
        if (booking == "Invalid"){
            res.status(422).send({
            errors: [
                {
                title: "Invalid user",
                detail: "Cannot create booking on your rental"
                }
            ]
            });
        }
        if (booking == "Payment"){
            res.status(422).send({
                errors: [
                  {
                    title: "Invalid payment",
                    detail: err.detail
                  }
                ]
              });
        }
        if (booking == "Booking"){
            res.status(422).send({
                errors: [
                  {
                    title: "Invalid booking",
                    detail: "Chosen dates are already taken"
                  }
                ]
              });
        }
        return res.json(booking);
    })
    .catch(err => res.status(422).send({ errors: errorHandler(err.errors) }));
}

export default {
    createBooking,
    getUserBookings
}