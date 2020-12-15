'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posting = require('../controllers/posting.controller');

var _posting2 = _interopRequireDefault(_posting);

var _login = require('../controllers/login.controller');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postingRouter = _express2.default.Router();

/**
 * Search - GET /getAllPostings/
 * Create - POST /create/
 */
//router.route('/').get(LoginController.getAllUsers);
postingRouter.route('/secret').get(_login2.default.authMiddleware, _posting2.default.secret);
postingRouter.route('/manage').get(_login2.default.authMiddleware, _posting2.default.managePostings);
/**
 * Retrieve - GET /posting/${id}
 * Update - PUT /posting/${id}
 * Delete - DELETE /posting/${id}
 */
postingRouter.route('/:id').get(_posting2.default.getByPostingID).patch(_login2.default.authMiddleware, _posting2.default.update).delete(_login2.default.authMiddleware, _posting2.default.remove);

postingRouter.route('').post(_login2.default.authMiddleware, _posting2.default.create);

postingRouter.route('').get(_posting2.default.getbyCity);
//export postingRouter
exports.default = postingRouter;