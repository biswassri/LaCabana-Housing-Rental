import express from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = express.Router();

/**
 * Search - GET /login/
 * Create - POST /login/
 */
//router.route('/').get(LoginController.getAllUsers);
loginRouter.route('/register').post(LoginController.register);
loginRouter.route('/auth').post(LoginController.authenticate);
loginRouter.route('/:id').get(LoginController.authMiddleware,LoginController.getUser);
/**
 * Retrieve - GET /login/${id}
 * Update - PUT /login/${id}
 * Delete - DELETE /login/${id}
 */
loginRouter.route('/:id')
    .patch(LoginController.authMiddleware,LoginController.update);

//export loginRouter
export default loginRouter;