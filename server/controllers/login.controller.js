import User from "../models/user.model";
import { errorHandler } from "../handlers/errorhandler";
import jwt from "jsonwebtoken";
import config from "../config";
import LoginService from '../services/login.service'
import { async } from "regenerator-runtime";

const getUser = (req, res) => {
  const reqUserId = req.params.id;
  const user = res.locals.user;

  if (reqUserId === user.id) {
    //display all
    try{
      var users = LoginService.getUser(reqUserId);
      return res.status(200).json(users);
    }
    catch(e){
      return res
              .status(422)
              .send({ errors: errorHandler(e.message) });
    }
    
  } else {
    //restrict some data
    try{
      var users = LoginService.getUser1(reqUserId);
      return res.status(200).json(users);
    }
    catch(e){
      return res
              .status(422)
              .send({ errors: errorHandler(e.message) });
    }
  }
};

const update = (req, res) => {
  const reqUserId = req.params.id;
  const user = res.locals.user;
  let userData = req.body;
  console.log(reqUserId);
  console.log(user);
  console.log(userData);
  if (reqUserId !== user.id) {
    return res.status(422).send({
      errors: [
        {
          title: "Not authorized",
          detail: "You are not allowed to update user date"
        }
      ]
    });
  }

  User.findById(reqUserId)
    .select("-password -rentals -bookings -balance")
    .exec((err, foundUser) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      User.updateOne({ _id: foundUser._id }, { $set: { userData } }, err => {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundUser);
      });
    });
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  var user = await User.findOne({ email });
    console.log(user + " " + email);
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Data Invalid User", detail: "User doesn't exist!" }]
      });
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
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
      });
    }
};

const register = async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  
  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Password doesn't match",
          detail: "Provide the same passwords!"
        }
      ]
    });
  }

  try {
    var exist = await LoginService.findOne(email);
    console.log(exist);
    if (exist) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email",
            detail: "The user with given email already exists!"
          }
        ]
      });
    }
  }
    catch(e){
      return res
              .status(422)
              .send({ errors: errorHandler(e.message) });
  }

    const user = new User({ username, email, password });
    user.save(err => {
      if (err) {
        return res.status(401).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json({ registered: true });
    });
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token.split(" ")[1], config.SECRET, function(err, user) {
      if (err) {
        return res.status(401).send({
          errors: [
            {
              title: "Not authenticated",
              detail: "Your session has been expired!"
            }
          ]
        });
      }

      User.findById(user.userId, (err, user) => {
        if (err) {
          return notAuthorized(res);
        }
        if (user) {
          res.locals.user = user;
          next();
        } else {
          return res.status(422).send({
            errors: [
              {
                title: "Not authorized",
                detail: "You need to login to get access!"
              }
            ]
          });
        }
      });
    });
  } else {
    return res.status(422).send({
      errors: [
        {
          title: "Not authorized",
          detail: "You need to login to get access!"
        }
      ]
    });
  }
};


export default{
  authMiddleware,
  update,
  getUser,
  authenticate,
  register
}