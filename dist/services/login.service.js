'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userModel = require('../models/user.model.js');

var _userModel2 = _interopRequireDefault(_userModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/');

var _config2 = _interopRequireDefault(_config);

var _regeneratorRuntime = require('regenerator-runtime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//Service to authenticate the user

var getUser = function () {
  var _ref = _asyncToGenerator(function* (id) {
    try {
      var user = yield _userModel2.default.findById(id).select("-password -rentals -bookings -id").exec();
      return user;
    } catch (e) {
      throw Error('Error while geting user');
    }
  });

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getUser1 = function () {
  var _ref2 = _asyncToGenerator(function* (id) {
    try {
      console.log(id);
      var user = yield _userModel2.default.findById(id).select("-password -rentals -bookings -balance").exec();
      console.log(user);
      return user;
    } catch (e) {
      throw Error('Error while geting user');
    }
  });

  return function getUser1(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var findOne = function () {
  var _ref3 = _asyncToGenerator(function* (email) {
    console.log(email);
    try {
      var user = yield _userModel2.default.findOne({ email: email }).exec();
      console.log(user);
      return user;
    } catch (e) {
      throw Error('Error while geting user');
    }
  });

  return function findOne(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var create = function () {
  var _ref4 = _asyncToGenerator(function* (username, email, password) {
    return new _userModel2.default({ username: username, email: email, password: password });
  });

  return function create(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var findID = function () {
  var _ref5 = _asyncToGenerator(function* (id) {
    console.log(id);
    try {
      var user = yield _userModel2.default.findById(id).exec();
      console.log(user);
      return user;
    } catch (e) {
      throw Error('Error while geting user');
    }
  });

  return function findID(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
exports.default = {
  findID: findID,
  create: create,
  getUser: getUser,
  getUser1: getUser1,
  findOne: findOne
};