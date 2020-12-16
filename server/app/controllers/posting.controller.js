import { async } from "regenerator-runtime";
import errorHandler from "../handlers/errorhandler";
import postingService from '../services/posting.service';

//This gets all the items of todo list from the database.
const secret =  (request,response,next) => {
    return response.json({secret:true});
}

//This creates the todo item in the database.
const create = async (req, res,next) => {
    const user = res.locals.user;
    //console.log(user);
  //  console.log(req.body);
    var p = await postingService.create(user,req);
    if(p){
        return res.json(p);
    }
    else{
        return res.status(422).send({
            errors: [{ title: "Postings Error", detail: "Could not create Posting" }]
          })
    }
}

//This gets the specific item based on the id from the database.
const getByPostingID = async (req, res, next) => {
    const rentalId = req.params.id;
    try {
      console.log("here in getbyid");
        var p = await postingService.getByPostingID(rentalId);
        if(!p){
            console.log("Inside p");
          return res.status(422).send({
            errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
        })
        }
         else {  
        return res.json(p);
         }
    }
    catch(err){
        return res.status(422).send({
            errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
       
    });
    }
}

//This gets all the postings from the db
const managePostings= async (req,res,next) =>{

    const user = res.locals.user;
    try{
        var p = await postingService.managePostings(user);
        if(p){
         return res.json(p);
        }
        else 
            return res.status(422).send({
                errors: [{ title: "Posting Error", detail: "Could not find Posting" }]});
        }
    catch (err){
        return res.status(422).send({
            errors: [{ title: "Posting Error", detail: err }]
    
    });
    }
}

//This gets the specific item based on the id from the database and updates it with the new values.
const update = async (request,response,next) => {
    const id = request.params.id;
    console.log("Update");
    try{
        var posting = await postingService.update(id, request.body, response);

    if(!posting){
      response.status(422).send({
        errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
        });
    }
    if(posting == "Invalid"){
      response.status(422).send({
            errors: [
                { title: "Invalid User", detail: "You are not Posting owner" }
            ]
        });
    }
    return response.json(posting);
    }   
    catch(err){ 
      response.status(422).send({ errors: [{ title: "Posting Error", detail: "Could not find Posting" }]});
    } 
}


//This gets the specific item based on the id from the database and deletes it.
const remove = async (request,response,next) => {
    const id = request.params.id;
    try{var posting =  await postingService.remove(id, response);
      if (!posting) {
          response.status(422).send({
            errors: [{ title: "Postings Error", detail: "Could not find Postings" }]
          });
        }

    if (posting == "err" || posting == undefined) {
        response.status(422).send({
          errors: [{ title: "Postings Error", detail: "Could not delete Postings" }]
        });
      }
            
    if(posting == "Invalid"){
      response.status(422).send({
            errors: [
              { title: "Invalid User", detail: "You are not Posting owner" }
            ]
        });
    }
    if(posting == "Present"){
      response.status(422).send({
            errors: [
              {
                title: "Active bookings!",
                detail: "Cannot delete rental with active booking"
              }
            ]
          });
    }

    response.status(200).json({
        message: "Deleted Succesfully"
    });
  }
  catch(err) {
    return response.status(422).send({ errors:  [
      {
        title: "Error in deleting bookings!",
        detail: "Cannot delete rental "
      }
    ]});
  }
}


//This gets the specific item based on the PostingID from the database.
const getbyCity = async(req, res) => {
    const city = req.query.city;
    const query = city ? { city: city } : {};
    try{
        var foundRentals = await postingService.getbyCity(query);
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