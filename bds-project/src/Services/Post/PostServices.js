import axios from "axios";
import Global from "../../global";
import { authHeader } from "../../Helper/AuthHeader";

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
// postId, userId, comment
const createComment = async (data) => {
  console.log(data);
  const response = await axios.post(
    `${Global.BASE_API_PATH}/api/v1/comment/new`, // change to create comment api
    data,
    authHeader()
  );
  return response?.data;
};

const createPost = async (data) => {
  let header = authHeader();
  header.headers['Content-Type'] = "multipart/form-data";
  
  const response = await axios.post(
    `${Global.BASE_API_PATH}/api/v1/post/new`, // change to create post api
    data,
    header
  );
  return response?.data;
};

const editComment = async (data) => {
  const response = await axios.put(
    `${Global.BASE_API_PATH}/api/v1/comment/update`, // change to edit comment api
    data,
    authHeader()
  );
  return response?.data;
};

const fetchCommentByPostId = async (postId) => {
  //change to api get comment by PostId
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/comment/list/${postId}`,
    authHeader()
  );

  return data;
};

const likePost = async (data) => {
  const response = await axios.put(
    `${Global.BASE_API_PATH}/api/v1/like/update`,
    data,
    authHeader()
  );
  return response?.data;
};

const createNewLike = async (data) => {
  const response = await axios.post(
    `${Global.BASE_API_PATH}/api/v1/like/new`,
    data,
    authHeader()
  );
  return response?.data;
};

export {
  fetchAllPosts,
  fetchPostById,
  createComment,
  fetchCommentByPostId,
  editComment,
  createPost,
  likePost,
  createNewLike,
};
