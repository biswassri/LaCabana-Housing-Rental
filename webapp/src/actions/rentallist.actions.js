import axios from "axios";
import constants from "../utils/constants";

import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAIL

} from "./type";

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

  export const fetchRental = id => dispatch => {
    dispatch({ type: FETCH_RENTAL_BY_ID_INIT });
    return axios
      .get(`${constants.BASE_URL_API}/postings/${id}`)
      .then(response =>
        dispatch({ type: FETCH_RENTAL_BY_ID_SUCCESS, payload: response.data })
      )
      .catch(rejected =>
        dispatch({
          type: FETCH_RENTAL_BY_ID_FAIL,
          payload: getErrorDescription(rejected)
        })
      );
  };

