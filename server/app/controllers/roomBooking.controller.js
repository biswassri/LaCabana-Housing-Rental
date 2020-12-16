
import errorHandler from '../handlers/errorhandler';
import RoomBookingService from '../services/roomBooking.service';
import RoomBooking from '../models/roombooking.model';

//token amount 
const CUSTOMER_SHARE = 0.8;

//Getting all User Bookings
const getUserBookings = async (req, res, next) => {
    try{
      console.log("Here");
      const user = res.locals.user;
      var booking =  await RoomBooking.find({user : user}).exec();
      console.log("Back to cont");
      if(booking) return res.json(booking)
      else return res.sendStatus(422).send({ 
        errors: [
          {
          title: "No booking",
          detail: "Cannot find bookings"
          }
      ]
       });
    }
    catch(err) {
      return res.status(422).send({ 
        errors: [
          {
          title: "Error in retrieving booking",
          detail: err
          }
      ]
      });
  }
}

//for creating Booking
const createBooking = async (req, res, next) => {
    try{
      var booking = await RoomBookingService.createBooking(req,res);
    
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
                    detail: "The Payment is invalid"
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
    }
    catch(err) {
      return res.status(422).send({errors: [
        {
          title: "Error Booking",
          detail: "Cannot create booking"
        }
      ] });
    }
}

export default {
    createBooking,
    getUserBookings
}