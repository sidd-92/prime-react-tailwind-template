import axios from "axios";
import AuthService from "./AuthService";

const prod = true;

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com/api";

//axios.defaults.withCredentials = true;

class BaseApiService {
  constructor() {}

  getDefaultApiUrl() {
    /* if (process.env.NODE_ENV === "production") {
      if (!(typeof window === "undefined")) {
        return window.location.protocol + "//" + window.location.hostname;
      }
    } */
    return DEFAULT_API_PATH;
  }

  getAxios() {
    return axios;
  }

  getAuth() {
    return AuthService.getAuthHeader();
  }

  isApiEnvDev() {
    return !prod;
  }
}

export default BaseApiService;
