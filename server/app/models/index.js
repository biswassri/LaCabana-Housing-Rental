import user from './user.model.js';
import postings from './posting.model';
import roomBooking from './roombooking.model';
import payment from './payment.model';

//exporting all the models from here.
export default {
    Postings : postings,
    User : user,
    RoomBooking : roomBooking,
    Payment : payment
};