
import { response } from 'express';
import postingService from '../services/login.service';



//This gets all the items of todo list from the database.
const authenticate =  (request,response,next) => {
    postingService.authenticate(request.body)
        .then(user => user ? response.json(user) : response.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
};

//This creates the todo item in the database.
const create = (request, response,next) => {
    console.log("Here in register");
    console.log(request.bodyy);
    postingService.create(request.body)
        .then((posting) => response.json(posting))
        .catch(err => next(err));
}

//This gets the specific item based on the id from the database.
const getByUserID = (req, res, next) => {
    postingService.getByUserID(req.body)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => next(err));
}

//This gets all the users from the db
const getAllPostings= (req,res,next) =>{
    postingService.getAll()
        .then(posting => posting ? res.json(posting) : "No postings yet ")
        .catch(err => next(err));
}

//This gets the specific item based on the id from the database and updates it with the new values.
const update = (request,response,next) => {
    const id = request.params.id;
    postingService.update(id, request.body)
    .then((posting) => response.json(posting))
    .catch(err => next(err)); 
};


//This gets the specific item based on the id from the database and deletes it.
const remove = (request,response,next) => {
    const id = request.params.id;
    postingService.remove(id)
        .then(() => {
            response.status(200);
            response.json({
                message: "Deleted Succesfully"
            });
        })
    .catch(err => next(err));
};

//This gets the specific item based on the PostingID from the database.
const getByPostingID = (req, res, next) => {
    const id = request.params.id;
    postingService.getByPostingID(id)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => next(err));
}

//This gets the specific item based on the PostingID from the database.
const getbyCity = (req, res, next) => {
    postingService.getbyCity(req.body)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => next(err));
}

//export it to the modules which calls this module.
export default {
    authenticate,
    create,
    getbyCity,
    getByUserID,
    getAllPostings,
    getByPostingID,
    update,
    remove
}