const moment = require("moment");
const config = require("../config");
const RoomBooking  = require("../models/roombooking.model");
const Posting = require("../models/posting.model");
const User = require("../models/user.model");
const Payment = require("../models/payment.model");;

const getUserBooking = async(req,res) =>{
    const user = res.locals.user;
    await RoomBooking.where({ user })
    .populate("posting")
    .exec((err, foundBookings) => {
      if (err) {
       throw err; 
    }
      return foundBookings;
    });
}
const createBooking = async(req,res) => {
    const {
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rentalId,
        paymentToken
      } = req.body;
      const user = res.locals.user;
      const booking = new RoomBooking({
        startAt,
        endAt,
        totalPrice,
        days,
        guests
      });

      await Posting.findById(rentalId)
        .populate("bookings")
        .populate("user")
        .exec(async (err, result) => {
          if (err) {
            throw err;
        }
          if (result.user.id === user.id) {
            return "Invalid";
          }
    
          if (isValidBooking(booking, result)) {
            booking.user = user;
            booking.posting = result;
            result.bookings.push(booking);
    
            const { payment, err } = await createPayment(
              booking,
              result.user,
              paymentToken
            );
    
            if (payment) {
              booking.payment = payment;
              await booking.save(err => {
                if (err) {
                  throw err;
                }
                result.save();
                User.updateOne(
                  { _id: user.id },
                  { $push: { bookings: booking } },
                  () => {}
                );
                return { startAt: booking.startAt, endAt: booking.endAt };
              });
            } else {
              return "Payment";
            }
          } else {
            return "Booking";
          }
        });
}


function isValidBooking(proposedBooking, posting) {
    if (posting.bookings && posting.bookings.length > 0) {
      return posting.bookings.every(booking => {
        return (
          moment(proposedBooking.startAt) > moment(booking.endAt) ||
          moment(proposedBooking.endAt) < moment(booking.startAt)
        );
      });
    }
    return true;
  }
  
  async function createPayment(booking, toUser, token) {
    const { user } = booking;
    const tokenId = token.id || token;
  
    const id1 = Math.random().toString(36).substring(7);
   
      const payment = new Payment({
        fromUser: user,
        toUser,
        fromStripeCustomerId: id1,
        booking,
        tokenId: token.id,
        amount: booking.totalPrice * 100 * CUSTOMER_SHARE
      });
  
      try {
        const savedPayment = await payment.save();
        return { payment: savedPayment };
      } catch (error) {
        throw error;
      }
  }
  
export default{
    createBooking : createBooking,
    getUserBooking : getUserBooking
}