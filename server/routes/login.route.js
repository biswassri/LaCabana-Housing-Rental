import express from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = express.Router();

/**
 * Search - GET /login/
 * Create - POST /login/
 */
//router.route('/').get(LoginController.getAllUsers);
loginRouter.route('/register').post(LoginController.register);
loginRouter.route('/authenticate').post(LoginController.authenticate);
loginRouter.route('/getAllUsers').get(LoginController.getAllUsers);
/**
 * Retrieve - GET /login/${id}
 * Update - PUT /login/${id}
 * Delete - DELETE /login/${id}
 */
loginRouter.route('/user/:id')
    .get(LoginController.getByUsername)
    .put(LoginController.update)
    .delete(LoginController.remove);

loginRouter.route('/user/self').get(LoginController.getByUsername);

export default loginRouter;