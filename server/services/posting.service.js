import Posting from '../models/posting.model';
import User from '../models/user.model'
const bcrypt = require('bcryptjs');

//This is for user creation
const create = async (user, req) => {
    console.log("here in create posting");
    // search for userID
    const posting = new Posting(req.body);
    posting.user = user;
    posting.save((err, newPost) => {
      if (err) {
        throw err;
      }
      await User.updateOne({ _id: user.id }, { $push: { postings: posting } }, () => {});
      return posting;
    });
}

//For updating the user details
const update = async (id, userParam, response) => {
    console.log(id);
    console.log(userParam);
    console.log(response);
    const user = response.locals.user;
    await Posting.findById(id)
    .populate("user", "_id")
    .exec((err, post) => {
      if (err) {
        throw err;
      }
      if (user.id !== foundRental.user.id) {
        return "Invalid";
      }
      post.set(userParam);
      post.save(err => {
        if (err) {
          throw err;
        }
        return post;
      });
    });
}

//This service is to get the posting by user.
const managePostings = async(req,res) => {
    const user = res.locals.user;
    await Posting.where({user})
      .populate("bookings")
      .exec((err, result) =>{
          if (err){
            throw err;
          }
          else return result;
      });
}

const remove = async(id, res) => {
    const user = res.locals.user;
    await Posting.findById(rentalId)
        .populate("user", "_id")
        .populate({
            path: "bookings",
            select: "endAt",
            match: { endAt: { $gt: new Date() } }
    })
    .exec((err, result) => {
      if (err) {
        throw err;
         }
      if (user.id !== result.user.id) {
        return "Invalid";
      }

      if (result.bookings.length > 0) {
        return "Present";
      }
      result.remove(err => {
        if (err) {
          throw err;
        }
      });
      return "Success";
    });
}
const getByPostingID = async(req) => {
    const id = req.params.id;

    await Posting.findById(id)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, found) => {
      if (err) {
        throw err;
      }
      return found;
    });
}
//This service is to delete the Posting.
const getbyCity = (req) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};
    await Posting.find(query)
      .select("-bookings")
      .exec((err, found) => {
        if (err) {
          throw err;
        }
        if (city && found.length === 0) {
          return "No Postings";
        }
        return found;
      });
}

export default {
    create: create,
    managePostings :managePostings,
    getbyCity : getbyCity,
    getByPostingID : getByPostingID,
    update: update,
    remove: remove
}