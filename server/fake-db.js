const Posting = require("./models/posting.model");
const User = require("./models/user.model");
const Booking = require("./models/roombooking.model");
const Payment = require("./models/payment.model");
const fakeDbData = require("../data.json");

class FakeDb {
  constructor() {
    this.postings = fakeDbData.postings;
    this.users = fakeDbData.users;
  }
  async cleanDb() {
    await User.remove();
    await Posting.remove();
    await Booking.remove();
    await Payment.remove();
  }
  async pushDataToDb() {
    await this.cleanDb();
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    this.postings.forEach(posting => {
      const newPosting = new Posting(posting);
      newPosting.user = user;
      user.postings.push(posting);
      newPosting.save();
    });
    user.save();
    user2.save();
  }
  // seedDb() {
  //   this.pushRentalsToDb();
  // }
}
module.exports = FakeDb;
