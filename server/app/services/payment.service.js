import Payment from '../models/payment.model';
import User from '../models/user.model';
import Booking from '../models/roombooking.model';
import Posting from '../models/posting.model'
import nodemailer from 'nodemailer';

const getPendingPayments = async(user)=>{
    console.log(user);
    try{
        var posts = await Payment.where({ toUser: user })
        .populate({
        path: "booking",
        populate: { path: "RoomBooking" }
        })
        .populate("fromUser")
        .exec();
        console.log(posts);
        if(posts) 
            return posts
        else 
            return null
    }
    catch(err){
        throw err;
    }

}

const declinePayment = async(payment) => {
  
    try {
        var foundPayment = await Payment.findById(payment._id)
      .populate("booking")
      .exec();
      console.log(foundPayment);
      if (foundPayment){
      var p = await Payment.updateOne(
        { _id: foundPayment._id },
        { $set: { status: "declined" } }
      ).exec();
        log(p);
      await Booking.updateOne(
        { _id: foundPayment.booking },
        { $set: { status: "declined" } }
      ).exec();

      await Posting.updateOne(
        { _id: foundPayment.booking.posting },
        { $pull: { bookings: foundPayment.booking._id } }
      ).exec();
      return "Declined"
  }
}
  catch(err){
    throw err;
  }
}

const confirmPayment = async(payment,user)=>{
    try{
        var foundPayment = await Payment.findById(payment._id)
    .populate("toUser")
    .populate("booking")
    .exec();
    
    
    if (
    foundPayment.status === "pending" &&
    user.id === foundPayment.toUser.id
    ) {
          console.log(foundPayment);
          console.log("here");
            const booking = foundPayment.booking;
            console.log(booking);
          var b = await Booking.update(
            { _id: booking._id },
            { $set: { status: "active" } }
          ).exec();
        if(b){
          console.log("here1");

          var p = await Payment.updateOne(
            { _id: foundPayment._id },
            {
              $set: {
                charge: "charged Fully",
                status: "paid"
              }
            },
          ).exec();
          console.log("here2");
        if(p){
          var u = User.updateOne(
            { _id: foundPayment.toUser._id },
            { $inc: { balance: foundPayment.amount } })
            .exec();
            if(u){
              const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'testresmail@gmail.com',
                    pass: 'Godisgreat123!'
                }
            });
            console.log(foundPayment.fromUser);
            var us = await User.findById(foundPayment.fromUser);
            console.log(us);
            // send email
            await transporter.sendMail({
                from: 'lacabanabookings@gmail.com',
                to: us.email,
                subject: 'Your booking is confirmed',
                text: 'Your booking at Lacabana is confirmed'
            });
              return "paid";
            }
            else 
                return null;
                
        }
    }
    }
}
    catch(err){
        throw err;
    }
}

export default {
    getPendingPayments : getPendingPayments,
    confirmPayment : confirmPayment,
    declinePayment : declinePayment
}