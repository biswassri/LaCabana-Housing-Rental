"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _payment = require("../controllers/payment.controller");

var _payment2 = _interopRequireDefault(_payment);

var _login = require("../controllers/login.controller");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paymentRouter = _express2.default.Router();

paymentRouter.route("").get(_login2.default.authMiddleware, _payment2.default.getPendingPayments);
paymentRouter.route("/accept").post(_login2.default.authMiddleware, _payment2.default.confirmPayment);
paymentRouter.route("/decline").post(_login2.default.authMiddleware, _payment2.default.declinePayment);

exports.default = paymentRouter;