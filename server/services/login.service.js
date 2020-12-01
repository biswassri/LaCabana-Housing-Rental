import User from '../models/user.model.js';
const bcrypt = require('bcryptjs');


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


const create = async (userParam) => {
    console.log("here in register");
    // validate
    let username = userParam.username;
    let reg = await User.find({username}).exec();
    console.log(reg);
    console.log(reg == "");
    console.log(reg == null);
    if (reg != "") {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    let u = await user.save();
    return u;
}


const update = async (id, userParam) => {

    const user = await User.findById({_id : id});

    // validate
    if (!user) throw 'User not found';
    console.log("here");
    let u = await User.findOne({ username: userParam.username }).exec();
    console.log(user);
    console.log(userParam.username);
    console.log(u);
    if (user.username == userParam.username || u != null) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (userParam.username){
        user.username = userParam.username;
    }

    // hash password if it was entered
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    console.log(user);
    let a = await user.save();
    return a;
}
//This service is to get all the Users.
const search = async(filter) => {
    const promise = await User.find(filter).exec();
    return promise;
}

//This service is to get the specific User.
const getByUsername = async(body) => {
    let username = body.username;
    const promise = await User.findOne({username }).exec();
    return promise;
}


//This service is to update the User.
// const update = (id, updatedToDo) => {
//     const promise = ToDo.findByIdAndUpdate(
//         { _id:id },
//         updatedToDo,
//         {new:true}
//     ).exec();
//     return promise;
// }

//This service is to delete the User.
const remove = (id) => {
    const promise = User.remove({_id:id}).exec();
    return promise;
}

export default {
    authenticate: authenticate,
    getByUsername: getByUsername,
    create: create,
    search :search,
    update: update,
    remove: remove
}