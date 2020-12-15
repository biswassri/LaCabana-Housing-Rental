'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userModel = require('./user.model.js');

var _userModel2 = _interopRequireDefault(_userModel);

var _posting = require('./posting.model');

var _posting2 = _interopRequireDefault(_posting);

var _roombooking = require('./roombooking.model');

var _roombooking2 = _interopRequireDefault(_roombooking);

var _payment = require('./payment.model');

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//exporting all the models from here.
exports.default = {
    Postings: _posting2.default,
    User: _userModel2.default,
    RoomBooking: _roombooking2.default,
    Payment: _payment2.default
};