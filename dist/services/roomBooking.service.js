"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createPayment = function () {
  var _ref5 = _asyncToGenerator(function* (booking, toUser, token) {
    var user = booking.user;

    var tokenId = token.id || token;

    var id1 = Math.random().toString(36).substring(7);

    var payment = new Payment({
      fromUser: user,
      toUser: toUser,
      fromStripeCustomerId: id1,
      booking: booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE
    });

    try {
      var savedPayment = yield payment.save();
      return { payment: savedPayment };
    } catch (error) {
      throw error;
    }
  });

  return function createPayment(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var moment = require("moment");
var config = require("../config");
var RoomBooking = require("../models/roombooking.model");
var Posting = require("../models/posting.model");
var User = require("../models/user.model");
var Payment = require("../models/payment.model");;

var getUserBooking = function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var user = res.locals.user;
    yield RoomBooking.where({ user: user }).populate("posting").exec(function (err, foundBookings) {
      if (err) {
        throw err;
      }
      return foundBookings;
    });
  });

  return function getUserBooking(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createBooking = function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var _req$body = req.body,
        startAt = _req$body.startAt,
        endAt = _req$body.endAt,
        totalPrice = _req$body.totalPrice,
        guests = _req$body.guests,
        days = _req$body.days,
        rentalId = _req$body.rentalId,
        paymentToken = _req$body.paymentToken;

    var user = res.locals.user;
    var booking = new RoomBooking({
      startAt: startAt,
      endAt: endAt,
      totalPrice: totalPrice,
      days: days,
      guests: guests
    });

    yield Posting.findById(rentalId).populate("bookings").populate("user").exec(function () {
      var _ref3 = _asyncToGenerator(function* (err, result) {
        if (err) {
          throw err;
        }
        if (result.user.id === user.id) {
          return "Invalid";
        }

        if (isValidBooking(booking, result)) {
          booking.user = user;
          booking.posting = result;
          result.bookings.push(booking);

          var _ref4 = yield createPayment(booking, result.user, paymentToken),
              payment = _ref4.payment,
              _err = _ref4.err;

          if (payment) {
            booking.payment = payment;
            yield booking.save(function (err) {
              if (err) {
                throw err;
              }
              result.save();
              User.updateOne({ _id: user.id }, { $push: { bookings: booking } }, function () {});
              return { startAt: booking.startAt, endAt: booking.endAt };
            });
          } else {
            return "Payment";
          }
        } else {
          return "Booking";
        }
      });

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
  });

  return function createBooking(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

function isValidBooking(proposedBooking, posting) {
  if (posting.bookings && posting.bookings.length > 0) {
    return posting.bookings.every(function (booking) {
      return moment(proposedBooking.startAt) > moment(booking.endAt) || moment(proposedBooking.endAt) < moment(booking.startAt);
    });
  }
  return true;
}

exports.default = {
  createBooking: createBooking,
  getUserBooking: getUserBooking
};