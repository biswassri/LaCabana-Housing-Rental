import axios from "axios";
import constants from "../utils/constants";
import axiosService from '../services/axios.service'

import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAIL,
  UPDATE_RENTAL_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL
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

export const fetchRentalByID = id => dispatch => {
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

  export const deleteRental = id => {
    console.log("here in delete rental");
    return axiosInstance
      .delete(`${constants.BASE_URL_API}/postings/${id}`)
      .then(
        res => res.data,
        rejected => Promise.reject(getErrorDescription(rejected))
      );
  };

  export const fetchUserRentals = () => {
    return dispatch => {
      dispatch({ type: FETCH_RENTALS_INIT });
      return axiosInstance
        .get(`${constants.BASE_URL_API}/postings/manage`)
        .then(response =>
          dispatch({ type: FETCH_RENTALS_SUCCESS, payload: response.data })
        )
        .catch(rejected =>
          dispatch({
            type: FETCH_RENTALS_FAIL,
            payload: getErrorDescription(rejected)
          })
        );
    };
  };

  export const updateRental = (id, ...rentalData) => dispatch => {
    dispatch({ type: UPDATE_RENTAL_INIT });
    return axios
      .patch(`/postings/${id}`, ...rentalData)
      .then(response =>
        dispatch({ type: UPDATE_RENTAL_SUCCESS, payload: response.data })
      )
      .catch(rejected =>
        dispatch({
          type: UPDATE_RENTAL_FAIL,
          payload: getErrorDescription(rejected)
        })
      );
  };
  
