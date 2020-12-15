"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regeneratorRuntime = require("regenerator-runtime");

var _errorhandler = require("../handlers/errorhandler");

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _posting = require("../services/posting.service");

var _posting2 = _interopRequireDefault(_posting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//This gets all the items of todo list from the database.
var secret = function secret(request, response, next) {
    return response.json({ secret: true });
};

//This creates the todo item in the database.
var create = function () {
    var _ref = _asyncToGenerator(function* (req, res, next) {
        var user = res.locals.user;
        //console.log(user);
        //  console.log(req.body);
        var p = yield _posting2.default.create(user, req);
        if (p) {
            return res.json(p);
        } else {
            return res.status(422).send({
                errors: [{ title: "Postings Error", detail: "Could not create Posting" }]
            });
        }
    });

    return function create(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

//This gets the specific item based on the id from the database.
var getByPostingID = function () {
    var _ref2 = _asyncToGenerator(function* (req, res, next) {
        var rentalId = req.params.id;
        try {
            var p = yield _posting2.default.getByPostingID(rentalId);
            console.log(p);
            if (!p) {
                console.log("Inside p");
                return res.status(422).send({
                    errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
                });
            } else {
                return res.json(p);
            }
        } catch (err) {
            return res.status(422).send({
                errors: [{ title: "Posting Error", detail: "Could not find Posting" }]

            });
        }
    });

    return function getByPostingID(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

//This gets all the postings from the db
var managePostings = function () {
    var _ref3 = _asyncToGenerator(function* (req, res, next) {

        var user = res.locals.user;
        try {
            var p = yield _posting2.default.managePostings(user);
            if (p) {
                return res.json(p);
            } else return res.status(422).send({
                errors: [{ title: "Posting Error", detail: "Could not find Posting" }] });
        } catch (err) {
            return res.status(422).send({
                errors: [{ title: "Posting Error", detail: err }]

            });
        }
    });

    return function managePostings(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();

//This gets the specific item based on the id from the database and updates it with the new values.
var update = function () {
    var _ref4 = _asyncToGenerator(function* (request, response, next) {
        var id = request.params.id;
        try {
            var posting = yield _posting2.default.update(id, request.body, response);

            if (!posting) {
                res.status(422).send({
                    errors: [{ title: "Posting Error", detail: "Could not find Posting" }]
                });
            }
            if (posting == "Invalid") {
                res.status(422).send({
                    errors: [{ title: "Invalid User", detail: "You are not Posting owner" }]
                });
            }
            return res.json(posting);
        } catch (err) {
            res.status(422).send({ errors: [{ title: "Posting Error", detail: "Could not find Posting" }] });
        }
    });

    return function update(_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}();

//This gets the specific item based on the id from the database and deletes it.
var remove = function remove(request, response, next) {
    var id = request.params.id;
    _posting2.default.remove(id, response).then(function (posting) {
        if (!posting) {
            response.status(422).send({
                errors: [{ title: "Postings Error", detail: "Could not find Postings" }]
            });
        }

        if (posting == "Invalid") {
            res.status(422).send({
                errors: [{ title: "Invalid User", detail: "You are not Posting owner" }]
            });
        }
        if (posting == "Present") {
            res.status(422).send({
                errors: [{
                    title: "Active bookings!",
                    detail: "Cannot delete rental with active booking"
                }]
            });
        }
        response.status(200);
        response.json({
            message: "Deleted Succesfully"
        });
    }).catch(function (err) {
        return res.status(422).send({ errors: (0, _errorhandler2.default)(err.errors) });
    });
};

//This gets the specific item based on the PostingID from the database.
var getbyCity = function () {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        var city = req.query.city;
        var query = city ? { city: city.toLowerCase() } : {};
        try {
            var foundRentals = yield _posting2.default.getbyCity(query);
            console.log(foundRentals);
            if (foundRentals) {
                if (city && foundRentals.length === 0) {
                    return res.status(422).send({
                        errors: [{
                            title: "No rentals found",
                            detail: "There are not rentals for " + city
                        }]
                    });
                }
                return res.json(foundRentals);
            } else {
                return res.status(422).send({
                    errors: [{
                        title: "Error in getting postings",
                        detail: "Error in getting postings"
                    }]
                });
            }
        } catch (err) {
            return res.status(422).send({ errors: [{
                    title: "Error in getting postings",
                    detail: "Error in getting postings"
                }] });
        }
    });

    return function getbyCity(_x13, _x14) {
        return _ref5.apply(this, arguments);
    };
}();

//export it to the modules which calls this module.
exports.default = {
    managePostings: managePostings,
    create: create,
    getbyCity: getbyCity,
    secret: secret,
    getByPostingID: getByPostingID,
    update: update,
    remove: remove
};