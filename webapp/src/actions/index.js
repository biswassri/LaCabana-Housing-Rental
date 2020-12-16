import axios from "axios";
import constants from "../utils/constants";
import fetchRental from "./rentallist.actions";
import {
FETCH_USER_BOOKINGS_INIT,
FETCH_USER_BOOKINGS_SUCCESS,
FETCH_USER_BOOKINGS_FAIL 
} from "./type";

function getErrorDescription(rejected) {
    return rejected.response
      ? rejected.response.data.errors || rejected.response.statusText
      : rejected.message;
  }
export const register = userData => {
    return axios
      .post(`${constants.BASE_URL_API}/users/register`, { ...userData })
      .then(
        res => res.data,
        rejected => Promise.reject(getErrorDescription(rejected))
      );
  };

  export const createBooking = booking => {
    return axios
      .post(`${constants.BASE_URL_API}/bookings/`, booking)
      .then(res => res.data)
      .catch(rejected => Promise.reject(getErrorDescription(rejected)));
  };