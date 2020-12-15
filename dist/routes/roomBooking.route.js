"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _roomBooking = require("../controllers/roomBooking.controller");

var _roomBooking2 = _interopRequireDefault(_roomBooking);

var _login = require("../controllers/login.controller");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roomBookingRouter = _express2.default.Router();

roomBookingRouter.route("").post(_login2.default.authMiddleware, _roomBooking2.default.createBooking);
roomBookingRouter.route("/manage").get(_login2.default.authMiddleware, _roomBooking2.default.getUserBookings);

exports.default = roomBookingRouter;