import axios from "axios";
import authService from "../services/auth.service";
import axiosService from "../services/axios.service";
import constants from "../utils/constants";
import { LOGIN_SUCCESS_ACT, LOGIN_FAILURE_ACT, LOGOUT_ACT, CLEAR_LOGIN_ERROR_ACT, REGISTER } from "./type";

function getErrorDescription(rejected) {
  return rejected.response
    ? rejected.response.data.errors || rejected.response.statusText
    : rejected.message;
}

export const login = (userData) => {
  return (dispatch) => {
    return axios
      .post(`${constants.BASE_URL_API}/users/auth`, { ...userData })
      .then((res) => res.data)
      .then((token) => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch((rejected) =>
        dispatch(loginFailure(getErrorDescription(rejected)))
      );
  };
};

export const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE_ACT,
    errors,
  };
};

export const loginSuccess = () => {
  let userDetails = authService.getUserDetails();
  const {
    username = "",
    email = "",
    firstname = "",
    lastname = "",
    location = "",
    phone = "",
  } = userDetails;
  return {
    type: LOGIN_SUCCESS_ACT,
    username,
    email,
    firstname,
    lastname,
    location,
    phone,
  };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type : LOGOUT_ACT
        })
    }
}

export const clearLoginErrors = () => {
    return (dispatch) => {
        dispatch({
            type : CLEAR_LOGIN_ERROR_ACT
        })
    }
}

export const register = userData => {
  return axios
    .post(`${constants.BASE_URL_API}/users/register`, { ...userData })
    .then(
      res => res.data,
      rejected => Promise.reject(getErrorDescription(rejected))
    );
};

