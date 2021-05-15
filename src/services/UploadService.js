import axios from "axios";

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com/api";

class UploadService {
  upload(data) {
    return axios.post(`${DEFAULT_API_PATH}/upload`, data);
  }
}

export default new UploadService();
