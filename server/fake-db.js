import Posting from "./models/posting.model";
import User from "./models/user.model";
import Booking from "./models/roombooking.model";
import Payment from "./models/payment.model";
import fakeDbData from "./test/data.json";

class FakeDb {
  constructor() {
    this.postings = fakeDbData.postings;
    this.users = fakeDbData.users;
  }
  async cleanDb() {
    await User.remove({}).exec();
    await Posting.remove({}).exec();
    await Booking.remove({}).exec();
    await Payment.remove({}).exec();
  }
  async pushDataToDb() {
     await this.cleanDb();
    const user = new User(this.users[0]);
    this.postings.forEach(posting => {
      const newPosting = new Posting(posting);
      console.log(posting);
      newPosting.user = user;
      user.postings.push(newPosting);
      newPosting.save();
    });
    user.save();
  }
  // seedDb() {
  //   this.pushRentalsToDb();
  // }
}
export default FakeDb;
