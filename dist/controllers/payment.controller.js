"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _payment = require("../models/payment.model");

var _payment2 = _interopRequireDefault(_payment);

var _errorhandler = require("../handlers/errorhandler");

var _errorhandler2 = _interopRequireDefault(_errorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPendingPayments = function getPendingPayments(req, res, next) {
    res.send(404);
};
var confirmPayment = function confirmPayment(req, res, next) {
    res.send(404);
};
var declinePayment = function declinePayment(req, res, next) {
    res.send(404);
};
exports.default = {
    getPendingPayments: getPendingPayments,
    confirmPayment: confirmPayment,
    declinePayment: declinePayment
};