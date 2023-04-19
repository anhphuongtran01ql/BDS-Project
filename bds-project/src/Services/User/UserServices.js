import axios from "axios";
import Global from "../../global";
import { authHeader } from "../../Helper/AuthHeader";

const fetchAllUsers = async () => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/user/list`,
    authHeader()
  );
  return data;
};

const fetchUserById = async (id) => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/user/id/${id}`,
    authHeader()
  );
  return data;
};

export { fetchAllUsers, fetchUserById };
