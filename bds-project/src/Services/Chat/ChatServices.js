import { authHeader } from "../../Helper/AuthHeader";
import Global from "../../global";
import axios from "axios";

const fetchInboxMessagesByUserId = async (userId, userRole) => {
  const basePath = `${Global.BASE_API_PATH}/api/v1/chat`;
  const { data } = await axios.get(
    `${basePath}/${
      userRole.includes("member") ? "sender?senderId=" : "receiver?receiverId="
    }${userId}`,
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

const createChat = async (senderId, receiverId) => {
  const response = await axios.post(
    `${Global.BASE_API_PATH}/api/v1/chat/new/room?senderId=${senderId}&receiverId=${receiverId}`,
    null,
    authHeader()
  );
  return response?.data;
};

export { fetchInboxMessagesByUserId, getChatByChatId, createChat };
