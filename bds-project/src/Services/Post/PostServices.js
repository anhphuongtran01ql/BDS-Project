import axios from "axios";
import Global from "../../global";

const fetchAllPosts = async () => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/post/list`,
  );
  return data;
};

export { fetchAllPosts };
