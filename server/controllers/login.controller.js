
import { response } from 'express';
import loginService from '../services/login.service';
import errorHandler from '../handlers/errorhandler';
import User from "../models/user.model";
import config from "../config";
import jwt from "jsonwebtoken";

//This gets all the items of todo list from the database.
const authenticate =  (request,response,next) => {
    loginService.authenticate(request.body)
        .then(token => {
          console.log(token);
          if (token == "NA"){
            res.status(401).send({ errors: errorHandler(err.errors) });
          }
          if(token == "Missing"){
            res.status(422).send({
              errors: [{ title: "Data missing", detail: "Provide email and password!" }]
            });
          }
          if (token == "NotFound"){
            res.status(422).send({
              errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
            });
          }
          if (token == "Wrong"){
            res.status(422).send({
              errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
            });
          }
          res.json(token);
        })
        .catch(err => response.status(422).send({errors : errorHandler(err.errors)}))
};

//This creates the todo item in the database.
const register = (request, response,next) => {
    console.log("Here in register");
    loginService.register(request.body)
        .then((user) => {
            console.log(user);
            if (user == "NA"){
              res.status(401).send({ errors: errorHandler(err.errors) });
            }
            if(user == "Missing"){
              res.status(422).send({
                errors: [{ title: "Data missing", detail: "Provide email and password!" }]
              });
            }
            if(user == "Password"){
              res.status(422).send({
                errors: [
                  {
                    title: "Password doesn't match",
                    detail: "Provide the same passwords!"
                  }
                ]
              });
            }
            if (user == "Existing"){
              res.status(422).send({
                errors: [
                  {
                    title: "Invalid email",
                    detail: "The user with given email already exists!"
                  }
                ]
              });
            }
            res.json(user);
        })
        .catch(err => response.status(422).send({errors : errorHandler(err.errors)})
)}

//This gets all the users from the db
const getUser= (req,res,next) =>{
    loginService.getUser(req,res)
        .then(user => user ? res.json(user) : "No users yet ")
        .catch(err => response.status(422).send({errors : errorHandler(err.errors)}));
}

//This gets the specific item based on the id from the database and updates it with the new values.
const update = (request,response,next) => {
    loginService.update(request, response)
    .then((user) => {
      if(user == "NA"){
        response.status(422).send({
          errors: [
            {
              title: "Not authorized",
              detail: "You are not allowed to update user date"
            }
          ]
        });
      }
      response.json(user)})
    .catch(err => response.status(422).send({errors : errorHandler(err.errors)})); 
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
  
//export it to the modules which calls this module.
export default {
    authenticate,
    register,
    authMiddleware,
    getUser,
    update
}