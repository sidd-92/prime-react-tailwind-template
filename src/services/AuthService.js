import axios from "axios";

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com";

class AuthService {
  login(data) {
    return axios.post(`${DEFAULT_API_PATH}/login`, data);
  }
}

export default new AuthService();
