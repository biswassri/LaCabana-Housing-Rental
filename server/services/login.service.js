import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import config from '../config/';
//Service to authenticate the user
const authenticate = async (body) =>{
    
    const { email, password } = body;

    if (!email || !password) {
        return "Missing";
      }
    
    await User.findOne({ email }, (err, user) => {
        if (err) {
          return "NA";
        }
        if (!user) {
          return "NotFound";
        }
        if (user.hasSamePassword(password)) {
          const token = jwt.sign(
            {
              userId: user.id,
              username: user.username
            },
            config.SECRET,
            { expiresIn: "1h" }
          );
          return token;
        } else {
          return "Wrong";
        }
      });
}

//This is for user creation
const register = async (userParam) => {
    const { username, email, password, passwordConfirmation } = userParam;

    if (!email || !password) {
        return "Missing";
    }

    if (password !== passwordConfirmation) {
        return "Password";
    }

    await User.findOne({ email }, (err, existingUser) => {
    if (err) {
      throw err;
    }
    if (existingUser) {
      return "Existing";
    }

    const user = new User({ username, email, password });
    user.save(err => {
      if (err) {
        return "NA";
      }

      return { registered: true };
    });
  });
}

//For updating the user details
const update = async (req, res) => {
    const reqUserId = req.params.id;
    const user = res.locals.user;
    let userData = req.body;

    if (reqUserId !== user.id) {
        return "NA";
    }

    await User.findById(reqUserId)
    .select("-password -rentals -bookings -balance")
    .exec((err, foundUser) => {
      if (err) {
        throw err;
       }
        User.updateOne({ _id: foundUser._id }, { $set: {userData } }, err => {
        if (err) {
          throw err;
        }
        return foundUser;
      });
    });
}
//This service is to get all the Users.
const getUser = async(req, res) => {
    const reqUserId = req.params.id;
    const user = res.locals.user;

    if (reqUserId === user.id) {
    //display all
    User.findById(reqUserId)
      .select("-password -rentals -bookings -id")
      .exec((err, foundUser) => {
        if (err) {
          if (err) {
            throw err;    
        }
        }
        return foundUser;
      });
  } else {
    //restrict some data
    User.findById(reqUserId)
      .select("-balance -password -rentals -bookings -_id")
      .exec((err, foundUser) => {
        if (err) {
            throw err;    
        }
        return foundUser;
      });
  }
}


export default {
    authenticate: authenticate,
    register: register,
    getUser :getUser,
    update: update,
}