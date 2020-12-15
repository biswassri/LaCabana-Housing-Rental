'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errorhandler = require('../handlers/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _roomBooking = require('../services/roomBooking.service');

var _roomBooking2 = _interopRequireDefault(_roomBooking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CUSTOMER_SHARE = 0.8;

var getUserBookings = function getUserBookings(req, res, next) {
    _roomBooking2.default.getUserBookings(req, res).then(function (booking) {
        return booking ? res.json(booking) : res.sendStatus(422);
    }).catch(function (err) {
        return res.status(422).send({ errors: (0, _errorhandler2.default)(err.errors) });
    });
};

var createBooking = function createBooking(req, res, next) {
    _roomBooking2.default.getUserBookings(req, res).then(function (booking) {
        if (booking == "Invalid") {
            res.status(422).send({
                errors: [{
                    title: "Invalid user",
                    detail: "Cannot create booking on your rental"
                }]
            });
        }
        if (booking == "Payment") {
            res.status(422).send({
                errors: [{
                    title: "Invalid payment",
                    detail: err.detail
                }]
            });
        }
        if (booking == "Booking") {
            res.status(422).send({
                errors: [{
                    title: "Invalid booking",
                    detail: "Chosen dates are already taken"
                }]
            });
        }
        return res.json(booking);
    }).catch(function (err) {
        return res.status(422).send({ errors: (0, _errorhandler2.default)(err.errors) });
    });
};

exports.default = {
    createBooking: createBooking,
    getUserBookings: getUserBookings
};