import express from 'express';
import PostingController from '../controllers/posting.controller';

const postingRouter = express.Router();

/**
 * Search - GET /getAllPostings/
 * Create - POST /create/
 */
//router.route('/').get(LoginController.getAllUsers);
postingRouter.route('/create').post(PostingController.create);
postingRouter.route('/getAllPostings').get(PostingController.getAllPostings);
/**
 * Retrieve - GET /posting/${id}
 * Update - PUT /posting/${id}
 * Delete - DELETE /posting/${id}
 */
postingRouter.route('/posting/:id')
    .get(PostingController.getByPostingID)
    .put(PostingController.update)
    .delete(PostingController.remove);

postingRouter.route('/posting/user/:id')
    .get(PostingController.getByUserID);

postingRouter.route('/posting/city/')
    .get(PostingController.getbyCity);
//export postingRouter
export default postingRouter;