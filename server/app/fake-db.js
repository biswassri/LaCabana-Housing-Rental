import Posting from "./models/posting.model";
import User from "./models/user.model";
import Booking from "./models/roombooking.model";
import Payment from "./models/payment.model";
import fakeDbData from "../data.json";

class FakeDb {
  constructor() {
    this.postings = fakeDbData.postings;
    this.users = fakeDbData.users;
    this.bookings = fakeDbData.bookings;
    this.payment  = fakeDbData.payment;
  }
  async cleanDb() {
    await User.remove({}).exec();
    await Posting.remove({}).exec();
    await Booking.remove({}).exec();
    await Payment.remove({}).exec();
  }
  async pushDataToDb() {
     await this.cleanDb();
    const user1 = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    this.postings.forEach(posting => {
      const newPosting = new Posting(posting);
      console.log(posting);
      const booking = new Booking(this.bookings[0]);
      const payment = new Payment(this.payment[0]);
      payment.fromUser = user2;
      payment.toUser = user1;
      payment.booking = booking;
      booking.payment = payment;
      booking.user = user2;
      newPosting.user = user1;
      user1.postings.push(newPosting);
      newPosting.bookings.push(booking);
      newPosting.save();
      user2.bookings.push(booking);
      booking.posting = newPosting;
      payment.save();
      booking.save();
    });
    user1.save();
    user2.save();
  }
  // seedDb() {
  //   this.pushRentalsToDb();
  // }
}
export default FakeDb;
