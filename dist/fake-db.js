"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _posting = require("./models/posting.model");

var _posting2 = _interopRequireDefault(_posting);

var _user = require("./models/user.model");

var _user2 = _interopRequireDefault(_user);

var _roombooking = require("./models/roombooking.model");

var _roombooking2 = _interopRequireDefault(_roombooking);

var _payment = require("./models/payment.model");

var _payment2 = _interopRequireDefault(_payment);

var _data = require("../data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FakeDb = function () {
  function FakeDb() {
    _classCallCheck(this, FakeDb);

    this.postings = _data2.default.postings;
    this.users = _data2.default.users;
  }

  _createClass(FakeDb, [{
    key: "cleanDb",
    value: function () {
      var _ref = _asyncToGenerator(function* () {
        yield _user2.default.remove({}).exec();
        yield _posting2.default.remove({}).exec();
        yield _roombooking2.default.remove({}).exec();
        yield _payment2.default.remove({}).exec();
      });

      function cleanDb() {
        return _ref.apply(this, arguments);
      }

      return cleanDb;
    }()
  }, {
    key: "pushDataToDb",
    value: function () {
      var _ref2 = _asyncToGenerator(function* () {
        yield this.cleanDb();
        var user = new _user2.default(this.users[0]);
        this.postings.forEach(function (posting) {
          var newPosting = new _posting2.default(posting);
          console.log(posting);
          newPosting.user = user;
          user.postings.push(newPosting);
          newPosting.save();
        });
        user.save();
      });

      function pushDataToDb() {
        return _ref2.apply(this, arguments);
      }

      return pushDataToDb;
    }()
    // seedDb() {
    //   this.pushRentalsToDb();
    // }

  }]);

  return FakeDb;
}();

exports.default = FakeDb;