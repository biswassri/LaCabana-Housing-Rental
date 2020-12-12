import errorHandler from "../handlers/errorhandler";
import postingService from '../services/login.service';

//This gets all the items of todo list from the database.
const secret =  (request,response,next) => {
    response.json({secret:true});
};

//This creates the todo item in the database.
const create = (request, response,next) => {
    const user = res.locals.user;

    const rental = new Rental(req.body);
    rental.user = user;
    rental.save((err, newRental) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      User.updateOne({ _id: user.id }, { $push: { rentals: rental } }, () => {});
      return res.json({ newRental });
    });
}

//This gets the specific item based on the id from the database.
const getByPostingID = (req, res, next) => {
    postingService.getByUserID(req.body)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => next(err));
}

//This gets all the users from the db
const managePostings= (req,res,next) =>{
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
const getbyCity = (req, res, next) => {
    postingService.getbyCity(req.body)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => next(err));
}

//export it to the modules which calls this module.
export default {
    managePostings,
    create,
    getbyCity,
    secret,
    getByPostingID,
    update,
    remove
}