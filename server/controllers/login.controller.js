import User from '../models/user.model.js';
import errorHandler from "../handlers/errorhandler";
import jwt from "jsonwebtoken";
import config from "../config";
import LoginService from '../services/login.service'
import { async } from "regenerator-runtime";


const getUser = async(req, res) => {
  console.log("Inside get user");
  const reqUserId = req.params.id;
  const user = res.locals.user;
  console.log(user);
  if (reqUserId === user.id) {
    //display all
    try{
      var users =  await LoginService.getUser(reqUserId);
      console.log(users);
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
      var users = await LoginService.getUser1(reqUserId);
      return res.status(200).json(users);
    }
    catch(e){
      return res
              .status(422)
              .send({ errors: errorHandler(e.message) });
    }
  }
};

const update = async (req, res) => {
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

  var u =  await LoginService.getUser(reqUserId)
  console.log(u);
  if (u){
      User.updateOne({ _id: u._id }, { $set: { 
        firstname : userData.firstname,
        lastname : userData.lastname,
        phone: userData.phone,
        email: userData.email,
        location : userData.location
      } }, err => {
        if (err) {
          return res.status(422).send({ errors: errorHandler(err.errors) });
        }
        return res.json(u);
      });
  }
  else{
    return res.status(422).send({
      errors: [
        {
          title: "not found",
          detail: "user not found"
        }
      ]
    });

  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  var user = await LoginService.findOne(email);
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

    const user = await LoginService.create(username, email, password);
    user.save(err => {
      if (err) {
        return res.status(401).send({ errors: errorHandler(err.errors) });
      }

      return res.json({ registered: true });
    });
};

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