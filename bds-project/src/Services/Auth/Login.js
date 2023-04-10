import axios from "axios";
import Global from "../../global";

const login = async (data) => {
  const response = await axios.post(`${Global.BASE_API_PATH}/api/login`, data);
  return response;
};

export { login };
