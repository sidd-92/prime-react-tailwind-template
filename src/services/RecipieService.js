import axios from "axios";

const DEFAULT_API_PATH = "https://auth-api-express.onrender.com/api";

class RecipieService {
  addRecipie(data) {
    /**
       * {
    "imageId":"60a7a9f44da4e50023abeee8",
    "recipieName": "Bun Dosa",
    "recipieDescription":"How To Make Bun Dosa",
    "recipieTotalTime": "20 Min",
    "recipieIngredients": ["Dosa Batter", "Oil", "Salt"]
}
       */
    return axios.post(`${DEFAULT_API_PATH}/recipies/add`, data);
  }
}

export default new RecipieService();
