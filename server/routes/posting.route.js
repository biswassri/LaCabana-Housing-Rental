import express from 'express';
import PostingController from '../controllers/posting.controller';

const postingRouter = express.Router();

/**
 * Search - GET /login/
 * Create - POST /login/
 */
//router.route('/').get(LoginController.getAllUsers);
postingRouter.route('/create').post(PostingController.create);
postingRouter.route('/getAllPostings').get(PostingController.getAllPostings);
/**
 * Retrieve - GET /login/${id}
 * Update - PUT /login/${id}
 * Delete - DELETE /login/${id}
 */
postingRouter.route('/posting/:id')
    .get(PostingController.getbyId)
    .put(PostingController.update)
    .delete(PostingController.remove);

//export postingRouter
export default postingRouter;