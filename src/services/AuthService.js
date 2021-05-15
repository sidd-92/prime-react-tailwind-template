import axios from "axios";

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com/api";

class AuthService {
  login(data) {
    return axios.post(`${DEFAULT_API_PATH}/user/login`, data);
  }

  decode(token) {
    return axios.post(`${DEFAULT_API_PATH}/user/decode`, token);
  }
}

export default new AuthService();
