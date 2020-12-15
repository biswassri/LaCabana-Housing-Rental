"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postingSchema = new _mongoose2.default.Schema({
    title: {
        type: String,
        required: true
    },
    city: {
        type: String, required: true
    },
    street: {
        type: String,
        required: true
    },
    category: {
        type: String, required: true,
        lowercase: true
    },
    image: {
        type: String
    },
    bedrooms: {
        type: Number
    },
    shared: {
        type: Boolean
    },
    description: {
        type: String,
        required: true
    },
    dailyRate: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "User"
    },
    bookings: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "Booking" }]

}, {
    versionKey: false

});

postingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
postingSchema.set('toJSON', { virtuals: true });
var model = _mongoose2.default.model('Posting', postingSchema);
exports.default = model;