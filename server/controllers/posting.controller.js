import errorHandler from "../handlers/errorhandler";
import postingService from '../services/login.service';

//This gets all the items of todo list from the database.
const secret =  (request,response,next) => {
    response.json({secret:true});
}

//This creates the todo item in the database.
const create = (request, response,next) => {
    console.log("Here in register");
    console.log(request.body);
    console.log(response.locals);
    const user = response.locals.user;
    postingService.create(user, request)
        .then((posting) => response.json(posting))
        .catch(err => response.status(422).send({errors : errorHandler(err.errors)})
        );
}

//This gets the specific item based on the id from the database.
const getByPostingID = (req, res, next) => {
    postingService.getByPostingID(req)
        .then(posting => posting ? res.json(posting) : res.sendStatus(404))
        .catch(err => res.status(422).send({
            errors: [{ title: "Postings Error", detail: "Could not find Posting" }]
          })
        );
}

//This gets all the users from the db
const managePostings= (req,res,next) =>{
    postingService.managePostings(req,res)
        .then(posting => posting ? res.json(posting) : "No postings found ")
        .catch(err => res.status(422).send({ errors: errorHandler(err.errors) }
        ));
}

//This gets the specific item based on the id from the database and updates it with the new values.
const update = (request,response,next) => {
    const id = request.params.id;
    postingService.update(id, request.body, response)
    .then(posting => {
        if(!posting){res.status(422).send({
            errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
          });
        }
        if(posting == "Invalid"){
            res.status(422).send({
                errors: [
                  { title: "Invalid User", detail: "You are not Posting owner" }
                ]
            });
        }
        res.json(posting);
    })
    .catch(err => res.status(422).send({ errors: errorHandler(err.errors) })); 
}


//This gets the specific item based on the id from the database and deletes it.
const remove = (request,response,next) => {
    const id = request.params.id;
    postingService.remove(id, response)
        .then((posting) => {
            if (!posting) {
                response.status(422).send({
                  errors: [{ title: "Postings Error", detail: "Could not find Postings" }]
                });
              }
            
            if(posting == "Invalid"){
                res.status(422).send({
                    errors: [
                      { title: "Invalid User", detail: "You are not Posting owner" }
                    ]
                });
            }
            if(posting == "Present"){
                res.status(422).send({
                    errors: [
                      {
                        title: "Active bookings!",
                        detail: "Cannot delete rental with active booking"
                      }
                    ]
                  });
            }
            response.status(200);
            response.json({
                message: "Deleted Succesfully"
            });
        })
    .catch(err => res.status(422).send({ errors: errorHandler(err.errors) }));
}


//This gets the specific item based on the PostingID from the database.
const getbyCity = (req, res, next) => {
    postingService.getbyCity(req)
        .then(posting => posting ? res.json(posting) : res.sendStatus(422))
        .catch(err => res.status(422).send({ errors: errorHandler(err.errors) }));
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