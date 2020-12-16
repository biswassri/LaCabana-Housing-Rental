import { combineReducers } from "redux";
import user from "./user.reducer";
import { rentalsReducer } from "./rentallist.red";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    user,
    rentals: rentalsReducer,
    form: formReducer,

});