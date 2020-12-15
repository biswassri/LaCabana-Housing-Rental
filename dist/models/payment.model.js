"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var paymentSchema = new Schema({
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "RoomBooking"
  },
  amount: {
    type: Number
  },
  tokenId: {
    type: String
  },
  charge: {
    type: String
  },
  status: {
    type: String,
    default: "pending"
  }
}, {
  versionKey: false

});
paymentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
paymentSchema.set('toJSON', { virtuals: true });
var model = mongoose.model('Payment', paymentSchema);
exports.default = model;