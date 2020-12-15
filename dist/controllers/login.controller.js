"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userModel = require("../models/user.model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _errorhandler = require("../handlers/errorhandler");

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _login = require("../services/login.service");

var _login2 = _interopRequireDefault(_login);

var _regeneratorRuntime = require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getUser = function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Inside get user");
    var reqUserId = req.params.id;
    var user = res.locals.user;
    console.log(user);
    if (reqUserId === user.id) {
      //display all
      try {
        var users = yield _login2.default.getUser(reqUserId);
        console.log(users);
        return res.status(200).json(users);
      } catch (e) {
        return res.status(422).send({ errors: [{
            title: "Error getting user",
            detail: "Cant find user"
          }] });
      }
    } else {
      //restrict some data
      try {
        var users = yield _login2.default.getUser1(reqUserId);
        return res.status(200).json(users);
      } catch (e) {
        return res.status(422).send({ errors: [{
            title: "Error getting user",
            detail: "Cant find user"
          }] });
      }
    }
  });

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var update = function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var reqUserId = req.params.id;
    var user = res.locals.user;
    var userData = req.body;
    console.log(reqUserId);
    console.log(user);
    console.log(userData);
    if (reqUserId !== user.id) {
      return res.status(422).send({
        errors: [{
          title: "Not authorized",
          detail: "You are not allowed to update user date"
        }]
      });
    }

    var u = yield _login2.default.getUser(reqUserId);
    console.log(u);
    if (u) {
      yield _userModel2.default.updateOne({ _id: u._id }, { $set: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          phone: userData.phone,
          email: userData.email,
          location: userData.location
        } }, function (err) {
        if (err) {
          return res.status(422).send({ errors: [{ title: "Error", detail: err }]
          });
        }
        return res.json(u);
      });
    } else {
      return res.status(422).send({
        errors: [{
          title: "Not found",
          detail: "User not found"
        }]
      });
    }
  });

  return function update(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var authenticate = function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;


    if (!email || !password) {
      return res.status(422).send({
        errors: [{ title: "Data missing", detail: "Provide email and password!" }]
      });
    }

    var user = yield _login2.default.findOne(email);
    console.log(user + " " + email);
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Data Invalid User", detail: "User doesn't exist!" }]
      });
    }
    if (user.hasSamePassword(password)) {
      var token = _jsonwebtoken2.default.sign({
        userId: user.id,
        username: user.username

      }, _config2.default.SECRET, { expiresIn: "1h" });
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
      });
    }
  });

  return function authenticate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var register = function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        email = _req$body2.email,
        password = _req$body2.password,
        passwordConfirmation = _req$body2.passwordConfirmation;


    if (!email || !password) {
      return res.status(422).send({
        errors: [{ title: "Data missing", detail: "Provide email and password!" }]
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(422).send({
        errors: [{
          title: "Password doesn't match",
          detail: "Provide the same passwords!"
        }]
      });
    }

    try {
      var exist = yield _login2.default.findOne(email);
      console.log(exist);
      if (exist) {
        return res.status(422).send({
          errors: [{
            title: "Invalid email",
            detail: "The user with given email already exists!"
          }]
        });
      }
    } catch (e) {
      return res.status(422).send({ errors: [{
          title: "Error in creating",
          detail: e
        }] });
    }

    var user = yield _login2.default.create(username, email, password);
    user.save(function (err) {
      if (err) {
        return res.status(401).send({ errors: [{
            title: "Error in creating",
            detail: err
          }] });
      }

      return res.json({ registered: true });
    });
  });

  return function register(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    _jsonwebtoken2.default.verify(token.split(" ")[1], _config2.default.SECRET, function (err, user) {
      if (err) {
        return res.status(401).send({
          errors: [{
            title: "Not authenticated",
            detail: "Your session has been expired!"
          }]
        });
      }

      _userModel2.default.findById(user.userId, function (err, user) {
        if (err) {
          return notAuthorized(res);
        }
        if (user) {
          res.locals.user = user;
          next();
        } else {
          return res.status(422).send({
            errors: [{
              title: "Not authorized",
              detail: "You need to login to get access!"
            }]
          });
        }
      });
    });
  } else {
    return res.status(422).send({
      errors: [{
        title: "Not authorized",
        detail: "You need to login to get access!"
      }]
    });
  }
};

exports.default = {
  authMiddleware: authMiddleware,
  update: update,
  getUser: getUser,
  authenticate: authenticate,
  register: register
};