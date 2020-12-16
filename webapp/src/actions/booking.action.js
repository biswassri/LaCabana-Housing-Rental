import axios from "axios";
import constants from "../utils/constants";
import axiosService from '../services/axios.service'

import {
    FETCH_USER_BOOKINGS_INIT,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    UPDATE_BOOKINGS 
} from "./type";

const axiosInstance = axiosService.getInstance();

function getErrorDescription(rejected) {
    return rejected.response
      ? rejected.response.data.errors || rejected.response.statusText
      : rejected.message;
}

//booking actions
export const fetchUserBookings = () => {
    return dispatch => {
      dispatch({ type: FETCH_USER_BOOKINGS_INIT });
      return axiosInstance
        .get("/bookings/manage")
        .then(response =>
          dispatch({ type: FETCH_USER_BOOKINGS_SUCCESS, payload: response.data })
        )
        .catch(rejected =>
          dispatch({
            type: FETCH_USER_BOOKINGS_FAIL,
            payload: getErrorDescription(rejected)
          })
        );
    };
  };

  export const updateBookings = bookings => {
    return {
      type: UPDATE_BOOKINGS,
      bookings
    };
  };