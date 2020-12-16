import axios from "axios";
import constants from "../utils/constants";

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


  