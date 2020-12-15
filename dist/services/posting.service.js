'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _posting = require('../models/posting.model');

var _posting2 = _interopRequireDefault(_posting);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bcrypt = require('bcryptjs');

//This is for user creation
var create = function () {
  var _ref = _asyncToGenerator(function* (user, req) {
    console.log("here in create posting");
    // search for userID

    var posting = yield _posting2.default.create(req.body);
    console.log(posting);
    posting.user = user;
    var p = yield posting.save();
    console.log(p);
    if (p) {
      var a = yield _user2.default.update({ _id: user.id }, { $push: { postings: p } });
      if (a) return p;else return null;;
    } else return null;
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//For updating the user details
var update = function () {
  var _ref2 = _asyncToGenerator(function* (id, userParam, response) {
    console.log(id);
    console.log(userParam);
    console.log(response);
    var user = response.locals.user;
    _posting2.default.findById(id).populate("user", "_id").exec(function (err, post) {
      if (err) {
        throw err;
      }
      if (user.id !== foundRental.user.id) {
        return "Invalid";
      }
      post.set(userParam);
      post.save(function (err) {
        if (err) {
          throw err;
        }
        return post;
      });
    });
  });

  return function update(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

//This service is to get the posting by user.
var managePostings = function () {
  var _ref3 = _asyncToGenerator(function* (user) {
    var p = yield _posting2.default.where(user).populate("bookings").exec();
    if (p) return p;else return null;
  });

  return function managePostings(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var remove = function () {
  var _ref4 = _asyncToGenerator(function* (id, res) {
    var user = res.locals.user;
    yield _posting2.default.findById(rentalId).populate("user", "_id").populate({
      path: "bookings",
      select: "endAt",
      match: { endAt: { $gt: new Date() } }
    }).exec(function (err, result) {
      if (err) {
        throw err;
      }
      if (user.id !== result.user.id) {
        return "Invalid";
      }

      if (result.bookings.length > 0) {
        return "Present";
      }
      result.remove(function (err) {
        if (err) {
          throw err;
        }
      });
      return "Success";
    });
  });

  return function remove(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getByPostingID = function () {
  var _ref5 = _asyncToGenerator(function* (id) {
    var p = yield _posting2.default.findById(id).populate("user", "username -_id").populate("bookings", "startAt endAt -_id").exec();
    console.log("Here in service");
    console.log(p);
    if (p) {
      return p;
    } else return null;
  });

  return function getByPostingID(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
//This service is to delete the Posting.
var getbyCity = function () {
  var _ref6 = _asyncToGenerator(function* (query) {
    console.log("here in get city");
    try {
      console.log(query);
      var p = yield _posting2.default.find(query).select("-bookings").exec();
      console.log(p);
      return p;
    } catch (e) {
      throw Error('Error while geting user');
    }
  });

  return function getbyCity(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.default = {
  create: create,
  managePostings: managePostings,
  getbyCity: getbyCity,
  getByPostingID: getByPostingID,
  update: update,
  remove: remove
};