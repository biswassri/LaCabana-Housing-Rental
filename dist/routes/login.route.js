'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('../controllers/login.controller');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginRouter = _express2.default.Router();

/**
 * Search - GET /login/
 * Create - POST /login/
 */
//router.route('/').get(LoginController.getAllUsers);
loginRouter.route('/register').post(_login2.default.register);
loginRouter.route('/auth').post(_login2.default.authenticate);
loginRouter.route('/:id').get(_login2.default.authMiddleware, _login2.default.getUser);
/**
 * Retrieve - GET /login/${id}
 * Update - PUT /login/${id}
 * Delete - DELETE /login/${id}
 */
loginRouter.route('/:id').patch(_login2.default.authMiddleware, _login2.default.update);

//export loginRouter
exports.default = loginRouter;