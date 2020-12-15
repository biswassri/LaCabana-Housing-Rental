'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _fakeDb = require('./fake-db');

var _fakeDb2 = _interopRequireDefault(_fakeDb);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

require('core-js/stable');

require('regenerator-runtime/runtime');

var _errorhandler = require('./handlers/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const MONGODV_URI = 'mongodb+srv://webdesign:webdesign1@lacabana.echsh.mongodb.net/lacabana?retryWrites=true&w=majority';
//This is used for a persisted MongoDB connection by using Mongoose ODM framework.
_mongoose2.default.connect(_config2.default.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    // const fakeDb = new FakeDb();
    // fakeDb.pushDataToDb();
});

_mongoose2.default.connection.on('connected', function () {
    console.log("Connection successful");
});
_mongoose2.default.Promise = global.Promise;

//Initializing the express framework in our app.
var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

//To allow all kinds of request
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//Passing the application to include the routes.
(0, _routes2.default)(app);
// app.get('/', (req, res) => {
//     res.send('respond with a resource');
//   });
// global error handler
app.use(_errorhandler2.default);
exports.default = app;