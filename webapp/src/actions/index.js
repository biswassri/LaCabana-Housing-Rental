import axios from "axios";

function getErrorDescription(rejected) {
    return rejected.response
      ? rejected.response.data.errors || rejected.response.statusText
      : rejected.message;
  }
export const register = userData => {
    return axios
      .post("/api/v1/users/register", { ...userData })
      .then(
        res => res.data,
        rejected => Promise.reject(getErrorDescription(rejected))
      );
  };
  