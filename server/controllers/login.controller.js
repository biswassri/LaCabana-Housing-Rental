
import { response } from 'express';
import loginService from '../services/login.service';



//This gets all the items of todo list from the database.
const authenticate =  (request,response,next) => {
    loginService.authenticate(request.body)
        .then(user => user ? response.json(user) : response.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
};

//This creates the todo item in the database.
const register = (request, response,next) => {
    console.log("Here in register");
    loginService.create(request.body)
        .then((user) => response.json(user))
        .catch(err => next(err));
}

//This gets the specific item based on the id from the database.
const getByUsername = (req, res, next) => {
    loginService.getByUsername(req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

//This gets all the users from the db
const getAllUsers= (req,res,next) =>{
    loginService.search({})
        .then(user => user ? res.json(user) : "No users yet ")
        .catch(err => next(err));
}

//This gets the specific item based on the id from the database and updates it with the new values.
const update = (request,response,next) => {
    const id = request.params.id;
    loginService.update(id, request.body)
    .then((user) => response.json(user))
    .catch(err => next(err)); 
};


//This gets the specific item based on the id from the database and deletes it.
const remove = (request,response,next) => {
    const id = request.params.id;
    loginService.remove(id)
        .then(() => {
            response.status(200);
            response.json({
                message: "Deleted Succesfully"
            });
        })
    .catch(err => next(err));
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
    getAllUsers,
    getByUsername,
    update,
    remove
}