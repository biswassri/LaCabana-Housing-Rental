import { combineReducers } from "redux";
import user from "./user.reducer";
import { rentalsReducer } from "./rentallist.red";

export default combineReducers({
    user,
    rentals: rentalsReducer,
});