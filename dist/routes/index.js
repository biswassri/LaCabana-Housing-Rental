'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('./login.route');

var _login2 = _interopRequireDefault(_login);

var _posting = require('./posting.route');

var _posting2 = _interopRequireDefault(_posting);

var _payment = require('./payment.route');

var _payment2 = _interopRequireDefault(_payment);

var _roomBooking = require('./roomBooking.route');

var _roomBooking2 = _interopRequireDefault(_roomBooking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Common route which is present for all. This now calls the specific routes from the other module.

exports.default = function (app) {
  app.use('/lacabana/users', _login2.default);
  app.use('/lacabana/postings', _posting2.default);
  //  app.use('/lacabana/payments', paymentRouter);
  app.use('/lacabana/bookings', _roomBooking2.default);
};