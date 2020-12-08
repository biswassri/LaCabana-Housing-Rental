import Posting from '../models/posting.model';
const bcrypt = require('bcryptjs');

//Service to authenticate the user
const authenticate = async (body) =>{
    let username = body.username;
    let password = body.password;
    const user = await User.findOne({username}).exec();
    console.log(user);
    console.log(password);
    console.log(user.password);
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
}

//This is for user creation
const create = async (userParam) => {
    console.log("here in create posting");
    // search for userID
    let u = await User.findOne({ username: userParam.username }).exec();
   
    console.log(u == "");
    if(u == ""){
        throw 'Username "' + userParam.username + '" not found. Please login';
    }
    let s = (await Posting.findOne({streetAddress:userParam.streetAddress})).exec();
    if(s == null || s == ""){
    let p = {
        firstname = userParam.firstname,
        lastname = userParam.lastname,
        phonenumber = userParam.phonenumber,
        emailID = userParam.emailID,
        ownerContactDetails = [
            {   firstName : firstname, 
                lastName  : lastname,
                phone     : phonenumber,
                email     : emailID 
            }],
        description = userParam.description,
        userId = u.userId,
        streetAddress = userParam.streetAddress,
        city = userParam.city,
        country = userParam.country,
        state = userParam.state,
        zipCode = userParam.zipCode,
        propertyType = userParam.propertyType,
        price = userParam.price,
        bedroom = userParam.bedroom,
        bathrooms = userParam.bathrooms,
        amenities = userParam.amenities,
        price = userParam.price,
        lastModifiedDate = Date.now
    };
    const posting = new Posting(p);

    // save posting
    let post = await Posting.create(posting);
    return post;
    }
    else throw "Same street address present in the database";
}

//For updating the user details
const update = async (id, userParam) => {

    const posting = await Posting.findById({_id : id});

    // validate
    if (!posting) throw 'Posting not found';
    console.log("here posting");
    if (posting.streetAddress !=  userParam.streetAddress){
        let pu = await User.find({ streetAddress: userParam.streetAddress }).exec();
        console.log(pu);
        if (pu.size > 1){
            throw 'Duplicate stress address';
        } 
    }

        posting.firstname = userParam.firstname,
        posting.lastname = userParam.lastname,
        posting.phonenumber = userParam.phonenumber,
        posting.emailID = userParam.emailID,
        posting.ownerContactDetails = [
            {   firstName : firstname, 
                lastName  : lastname,
                phone     : phonenumber,
                email     : emailID 
            }],
        posting.description = userParam.description,
        posting.streetAddress = userParam.streetAddress,
        posting.city = userParam.city,
        posting.country = userParam.country,
        posting.state = userParam.state,
        posting.zipCode = userParam.zipCode,
        posting.propertyType = userParam.propertyType,
        posting.price = userParam.price,
        posting.bedroom = userParam.bedroom,
        posting.bathrooms = userParam.bathrooms,
        posting.amenities = userParam.amenities,
        posting.price = userParam.price,
        posting.lastModifiedDate = Date.now

    let a = await posting.save();
    return a;
}
//This service is to get all the Posting.
const search = async(filter) => {
    const promise = await Posting.find(filter).exec();
    return promise;
}

//This service is to get the specific Posting.
const getByUserID = async(body) => {
    let userid = body.userid;
    const promise = await Posting.find({userId : userid }).exec();
    return promise;
}

//This service is to delete the Posting.
const remove = (id) => {
    const promise = User.remove({_id:id}).exec();
    return promise;
}

export default {
    authenticate: authenticate,
    getByUserID: getByUserID,
    create: create,
    search :search,
    update: update,
    remove: remove
}