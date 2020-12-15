import axios from "axios";
import authService from "./auth.service";
import constants from "../utils/constants"

class axiosService {
  instance = {};
  constructor() {
    this.initInstance();
  }
  initInstance() {
    this.instance = axios.create({
      baseURL: constants.BASE_URL_API,
      timeout: 3000
    });

    this.instance.interceptors.request.use(config => {
      const token = authService.getToken();
      config.headers.Authorization = `Bearer: ${token}`;
      return config;
    });
    return this.instance;
  }

  getInstance() {
    return this.instance || this.initInstance();
  }
}

export default new axiosService();
