import axios from "axios";
import authService from "../services/auth.service";
import axiosService from "../services/axios.service";
import constants from "../utils/constants";

import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
} from "./type";

const axiosInstance = axiosService.getInstance();

function getErrorDescription(rejected) {
    return rejected.response
      ? rejected.response.data.errors || rejected.response.statusText
      : rejected.message;
  }
  
//rental actions
export const fetchRentals = city => {
    const url = `${constants.BASE_URL_API}/postings`;
    return dispatch => {
      dispatch({ type: FETCH_RENTALS_INIT });
      return axios
        .get(url)
        .then(response =>
          dispatch({ type: FETCH_RENTALS_SUCCESS, payload: response.data })
        )
        .catch(rejected => {
          dispatch({
            type: FETCH_RENTALS_FAIL,
            payload: getErrorDescription(rejected)
          });
        });
    };
  };

  export const createRental = rentalData => {
    return axiosInstance
      .post("/postings/", { ...rentalData })
      .then(
        res => res.data,
        rejected => Promise.reject(getErrorDescription(rejected))
      );
  };