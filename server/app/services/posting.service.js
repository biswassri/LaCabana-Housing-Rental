import Posting from '../models/posting.model';
import User from '../models/user.model'
const bcrypt = require('bcryptjs');

//This is for user creation
const create = async (user, req) => {
    console.log("here in create posting");
    // search for userID
    
    const posting = await Posting.create(req.body);
    console.log(posting);
    posting.user = user;
    var p = await posting.save();
    console.log(p);
    if (p){
      var a = await User.update({ _id: user.id }, { $push: { postings: p } });
      if (a) 
        return p;
      else return null;;
    }
    else return null;
}

//For updating the user details
const update = async (id, userParam, response) => {
    console.log(id);
    console.log(userParam);
    const user = response.locals.user;
    var foundRental = await Posting.findById(id)
    .populate("user", "_id")
    .exec();

    console.log(foundRental);
    if (user.id !== foundRental.user.id) {
      return "Invalid";
    }
    console.log("Here");

    var post = await Posting.update({_id : id},
      {$set : userParam})
    .exec();

    if(post)
      return post;
    else 
      return null;
}

//This service is to get the posting by user.
const managePostings = async(user) => {
     var p = await Posting.find({ user : { _id : user._id}})
      .populate("bookings")
      .exec();
    console.log(p);

    if(p) 
      return p;
    else 
      return null;

}

const remove = async(id, res) => {
    const user = res.locals.user;
    try{
      var result = await Posting.findById(rentalId)
        .populate("user", "_id")
        .populate({
            path: "bookings",
            select: "endAt",
            match: { endAt: { $gt: new Date() } }
    })
    .exec();
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
  }
  catch(err){
    return "err";
  }
}
const getByPostingID = async(id) => {
  console.log(id);
    var p = await Posting.findById(id)
    .populate("user")
    .populate( {path : "bookings" , model : "RoomBooking"})
    .exec();
    console.log("Here in service");
    console.log(p);
    if(p){
      return p;
    }
    else return null;
}
//This service is to delete the Posting.
const getbyCity = async(query) => {
    console.log("here in get city");
    try {
        console.log(query);
        var p = await Posting.find(query)
      .select("-bookings")
      .exec();
      console.log(p);
      return p;
    }
    catch(e){
      throw Error('Error while geting user');
    }
};

export default {
    create: create,
    managePostings :managePostings,
    getbyCity : getbyCity,
    getByPostingID : getByPostingID,
    update: update,
    remove: remove
}