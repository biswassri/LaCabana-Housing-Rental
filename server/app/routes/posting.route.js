import express from 'express';
import PostingController from '../controllers/posting.controller';
import LoginController from '../controllers/login.controller'
const postingRouter = express.Router();

/**
 * Search - GET /
 * Create - POST /
 */
//router.route('/').get(LoginController.getAllUsers);
postingRouter.route('/secret').get(LoginController.authMiddleware, PostingController.secret);
postingRouter.route('/manage').get(LoginController.authMiddleware, PostingController.managePostings);
/**
 * Retrieve - GET /posting/${id}
 * Update - PUT /posting/${id}
 * Delete - DELETE /posting/${id}
 */
postingRouter.route('/:id')
    .get(PostingController.getByPostingID)
    .patch(LoginController.authMiddleware, PostingController.update)
    .delete(LoginController.authMiddleware, PostingController.remove);

postingRouter.route('')
    .post(LoginController.authMiddleware, PostingController.create);

postingRouter.route('')
    .get(PostingController.getbyCity);
//export postingRouter
export default postingRouter;