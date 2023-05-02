import { authHeader } from "../../Helper/AuthHeader";
import Global from "../../global";
import axios from "axios";

const fetchInboxMessagesByUserId = async (userId, userRole) => {
  const basePath = `${Global.BASE_API_PATH}/api/v1/chat`;
  const { data } = await axios.get(
    `${basePath}/${
      userRole.includes("guest") ? "sender?senderId=" : "receiver?receiverId="}${userId}`,
    authHeader()
  );

  return data;
};

const getChatByChatId = async (chatId) => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/chat/get?chatId=${chatId}`,
    authHeader()
  );

  return data;
};

export { fetchInboxMessagesByUserId, getChatByChatId };
