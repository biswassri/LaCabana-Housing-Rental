import User from '../models/user.model.js';
import errorHandler from "../handlers/errorhandler";
import jwt from "jsonwebtoken";
import config from "../config";
import LoginService from '../services/login.service'
import { async } from "regenerator-runtime";

//Login Controller

//Get all users
const getUser = async(req, res) => {
  console.log("Inside get user");
  const reqUserId = req.params.id;
  const user = res.locals.user;
  if (reqUserId === user.id) {
    try{
      var users =  await LoginService.getUser(reqUserId);
      return res.status(200).json(users);
    }
    catch(e){
      return res
              .status(422)
              .send({ errors: [
                {
                  title: "Error getting user",
                  detail: "Cant find user"
                }
              ] });
    }
    
  } else {
    //restrict some data
    try{
      var users = await LoginService.getUser1(reqUserId);
      return res.status(200).json(users);
    }
    catch(e){
      return res
              .status(422)
              .send({ errors: [
                {
                  title: "Error getting user",
                  detail: "Cant find user"
                }
              ] });
    }
  }
};

//Updating the user details
const update = async (req, res) => {
  const reqUserId = req.params.id;
  const user = res.locals.user;
  let userData = req.body;
  // console.log(reqUserId);
  // console.log(user);
  // console.log(userData);
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

  var u =  await LoginService.getUser(reqUserId);
  if (u){
      try
      { 
        //updating values
        var use = await User.updateOne({ _id: u._id }, { $set: { 
        firstname : userData.firstname,
        lastname : userData.lastname,
        phone: userData.phone,
        email: userData.email,
        location : userData.location
      } });
      if (use){     
        return res.json(use);
      }
      }
    catch (err) {
          return res.status(422).send( {errors: [{ title: "Error", detail: err }]
        });
    }
        return res.json(u);
  }
  else{
    return res.status(422).send({
      errors: [
        {
          title: "Not found",
          detail: "User not found"
        }
      ]
    });

  }
};

//For authentication purpose called in login
const authenticate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  var user = await LoginService.findOne(email);
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Data Invalid User", detail: "User doesn't exist!" }]
      });
    }
    if (user.hasSamePassword(password)) {
      //jwt token for authentication
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,  
          emailId: user.email,
          location: user.location
        },
        config.SECRET,
        { expiresIn: "24h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
      });
    }
};

//register (create) user
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
    //checking for duplicates
    var exist = await LoginService.findOne(email);
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
              .send({ errors: [
                {
                  title: "Error in creating",
                  detail: e
                }
              ] });
  }

    const user = await LoginService.create(username, email, password);
    user.save(err => {
      if (err) {
        return res.status(401).send({  errors: [
          {
            title: "Error in creating",
            detail: err
          }
        ]  });
      }

      return res.json({ registered: true });
    });
};

//for the middleware authorization
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
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
      //finding user by id
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

//exporting default
export default{
  authMiddleware,
  update,
  getUser,
  authenticate,
  register
}