import axios from "axios";

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com";

class AuthService {
  login(data) {
    return axios.post(`${DEFAULT_API_PATH}/login`, data);
  }

  getUserById(id) {
    return axios.get(`${DEFAULT_API_PATH}/user/${id}`);
  }
}

export default new AuthService();
