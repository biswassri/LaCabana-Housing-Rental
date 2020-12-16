import moment from  "moment";
import config from "../config";
import RoomBooking  from "../models/roombooking.model";
import Posting from "../models/posting.model";
import User from "../models/user.model";
import Payment from "../models/payment.model";

const getUserBooking = async(req,res) =>{
    const user = res.locals.user;
    console.log("here inseode");
    console.log(user);
    var bookings1 = user.bookings;
    console.log(bookings);
    try{
      var book = await RoomBooking.find({user : user}).exec();
    // .populate({path : "posting", model: "Posting"})
    // .exec();
    console.log(book);
    if (book)
      return book;
    else return null; 
  }
  catch(err) {
       throw err; 
    }
}

const createBooking = async(req,res) => {
    const {
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rentalId,
        paymentT
      } = req.body;
      console.log(req.body);
      console.log("Long before");
      const user = res.locals.user;
      const booking = await RoomBooking.create({
        startAt : startAt,
        endAt : endAt,
        totalPrice : totalPrice,
        days : days,
        guests : guests
      });
      console.log("Before");
      console.log(booking);
      try{
        var result = await Posting.findById(rentalId)
        .populate({path : "bookings", model : "RoomBooking"})
        .populate("user")
        .exec();
        console.log(result);
        if (result.user.id === user.id) {
          return "Invalid";
        }
        console.log("Checkpoint");
        if (isValidBooking(booking, result)) {
            booking.user = user;
            var r = await Posting.updateOne({_id : rentalId},{$push : {bookings: booking}}).exec();
            console.log(result);
            console.log(r);
            booking.posting = result;
            console.log("Checkpt1");

            const payment = await Payment.create({});
            var paymentToken = { 
              "id" : Math.random().toString(36).substring(7),
              "object" : "token" 
            };
            console.log(payment);
            console.log(user);
            console.log(result.user);
            console.log(paymentToken);
            console.log(booking);
            console.log(paymentToken.id);
            var price =  booking.totalPrice*100*0.8;
            console.log(price);
            var r = await Payment.updateOne({_id : payment._id},
              {$set : {
                fromUser: user,
                toUser : result.user,
                token : paymentToken,
                booking : booking,
                tokenId : paymentToken.id,
                amount : price
              }})
              .exec();
            
            // payment.fromUser.push(user);
            // payment.toUser.push(result.user);
            // payment.token = paymentToken;
            // payment.booking.push(booking);
            // payment.tokenId=  paymentToken.id;
            // payment.amount= booking.totalPrice * 100 * CUSTOMER_SHARE;
            // payment.save();
            console.log(r);

            if (payment) {
              booking.payment = payment;
              await booking.save(err => {
                if (err) {
                  throw err;
                }
                result.save();
                User.updateOne(
                  { _id: user._id },
                  { $push: { bookings: booking } }
                ).exec();
                return { startAt: booking.startAt, endAt: booking.endAt };
              });
            } else {
              return "Payment";
            }
      } else {
        return "Booking";
      }
    }
    catch(err){
      throw err;
    }
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
  
export default{
    createBooking : createBooking,
    getUserBooking : getUserBooking
}