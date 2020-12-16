import axios from "axios";
import constants from "../utils/constants";
import axiosService from '../services/axios.service'

const axiosInstance = axiosService.getInstance();

function getErrorDescription(rejected) {
  return rejected.response
    ? rejected.response.data.errors || rejected.response.statusText
    : rejected.message;
}

export const getUserDetails = userId => {
    return axiosInstance
      .get(`/users/${userId}`)
      .then(res => res.data)
      .catch(rejected => Promise.reject(getErrorDescription(rejected)));
  };
  
  export const updateUserDetails = (userId, userData) => {
    return axiosInstance
      .patch(`/users/${userId}`, userData)
      .then(res => res.data)
      .catch(rejected => Promise.reject(getErrorDescription(rejected)));
  };