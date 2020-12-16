import { combineReducers } from "redux";
import user from "./user.reducer";
import { rentalsReducer } from "./rentallist.red";
import { reducer as formReducer } from "redux-form";
import { bookingReducer } from "./booking.red";

export default combineReducers({
    user,
    rentals: rentalsReducer,
    form: formReducer,
    bookings: bookingReducer,

});