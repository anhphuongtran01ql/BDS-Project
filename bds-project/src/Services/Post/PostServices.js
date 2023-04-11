import axios from "axios";
import Global from "../../global";

const fetchAllPosts = async (paramQuery) => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/post/list?page=${
      paramQuery.page - 1
    }&size=${paramQuery.pageSize}`
  );
  return data;
};

const fetchPostById = async (postId) => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/post/${postId}`
  );
  return data;
};

export { fetchAllPosts, fetchPostById };
