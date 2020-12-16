import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import config from '../config/';
import {async} from 'regenerator-runtime'
//Service to authenticate the user

const getUser = async (id) =>{
  try{
    var user = await User.findById(id)
    .select("-password -rentals -bookings -id")
    .exec();
    return user;
  }
  catch(e){
    throw Error('Error while geting user');
  }
}
//get users by avoiding
const getUser1 = async (id) =>{
  try{
    var user = await User.findById(id)
    .select("-password -rentals -bookings -balance")
    .exec();
    return user;
  }
  catch(e){
    throw Error('Error while geting user');
  }
}

//search for one
const findOne = async (email) =>{
  try{
    var user = await User.findOne({email}).exec();
    return user;
  }
  catch(e){
    throw Error('Error while geting user');
  }
}
//creating a new user
const create = async (username, email, password) =>{
  return new User({username, email, password});
}

//find user by id
const findID = async (id) =>{
  try{
    var user = await User.findById(id).exec();
    return user;
  }
  catch(e){
    throw Error('Error while geting user');
  }
}
export default {
  findID : findID,
  create : create,
    getUser :getUser,
    getUser1 : getUser1,
    findOne : findOne
}