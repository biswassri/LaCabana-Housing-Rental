import { async } from "regenerator-runtime";
import errorHandler from "../handlers/errorhandler";
import postingService from '../services/posting.service';

//This gets all the items of todo list from the database.
const secret =  (request,response,next) => {
    response.json({secret:true});
}

//This creates the todo item in the database.
const create = async (req, res,next) => {
    const user = res.locals.user;
    //console.log(user);
  //  console.log(req.body);
    var p = await postingService.create(user,req);
    if(p){
        return p;
    }
    else{
        return res.status(422).send({
            errors: [{ title: "Postings Error", detail: "Could not create Posting" }]
          })
    }
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
const getbyCity = async(req, res) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};
    try{
        var foundRentals = await postingService.getbyCity(query);
    console.log(foundRentals);
    if (foundRentals){
        if (city && foundRentals.length === 0) {
          return res.status(422).send({
            errors: [
              {
                title: "No rentals found",
                detail: `There are not rentals for ${city}`
              }
            ]
          });
        }
        return res.json(foundRentals);
      }
      else{
        return res.status(422).send({
            errors: [
              {
                title: "Error in getting postings",
                detail:  "Error in getting postings"
              }
            ]
          });
        }
    }
    catch(err){
        return res
        .status(422)
        .send({ errors: [
            {
              title: "Error in getting postings",
              detail:  "Error in getting postings"
            }
          ] });
    }
};

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