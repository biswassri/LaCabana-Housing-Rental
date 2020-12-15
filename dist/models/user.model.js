'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: "Username is a required property."
    },
    password: {
        type: String,
        required: "Password is a required property."
    },
    location: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        lowercase: true,
        required: "Email is a required property."
    },
    gender: {
        type: String
    },
    balance: {
        type: Number,
        default: 0
    },
    postings: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "Posting"
    }],
    bookings: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "Booking"
    }]

}, {
    versionKey: false

});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.hasSamePassword = function (requestedPassword) {
    return _bcrypt2.default.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function (next) {
    var user = this;
    _bcrypt2.default.genSalt(10, function (err, salt) {
        _bcrypt2.default.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

var model = _mongoose2.default.model('User', userSchema);
exports.default = model;