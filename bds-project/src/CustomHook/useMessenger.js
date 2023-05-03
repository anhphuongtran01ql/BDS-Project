import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { authHeader } from "../Helper/AuthHeader";
import Global from "../global";
import { useGetUserInfo } from "../components/Auth/Authorization/getUserInfo";

const handleMessagesData = (data, results = []) => {
  // data.map((item, index) => {
  //     const length = results.length;
  //     if (results.length === 0) {
  //         results = [...results, item]
  //     } else if (results[length - 1]?.senderId === item.senderId) {
  //         if (!results[length - 1].hasOwnProperty('messages')) {
  //             results[length - 1].messages = [results[length - 1].content];
  //             results[length - 1].multiple = true;
  //         }
  //         results[length - 1].messages.push(item.content)
  //     } else {
  //         results = [...results, item]
  //     }
  // })
  return data;
};

const useMessenger = (chatId) => {
  const [messages, setMessages] = useState({});
  const [status, setStatus] = useState("");
  const { username } = useGetUserInfo();
  const ws = useRef();

  const handleListMessage = (chatId) => {
    const fetchMessages = async (chatId) => {
      await axios
        .get(
          `${Global.BASE_API_PATH}/api/v1/chat/get?chatId=${chatId}`,
          authHeader()
        )
        .then((response) => {
          setStatus("success");
          setMessages({
            receiverName: response.data.receiverName,
            senderName: response.data.senderName,
            messages: handleMessagesData(response.data.messages),
          });
        });
    };
    fetchMessages(chatId);
  };

  const handleSendMessage = (messageInput) => {
    ws.current.send(
      JSON.stringify({
        event: "bds.chat",
        action: "SEND",
        message: messageInput,
        sender: username,
        timestamp: new Date().toJSON(),
      })
    );
  };

  useEffect(() => {
    handleListMessage(chatId);
    ws.current = new WebSocket(
      "ws:///localhost:8000/ws/chats/" + chatId + "/",
      ["Token", username]
    );

    ws.current.onopen = () => {
      console.log("connected");
    };

    ws.current.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      const event = payload.event;

      switch (event) {
        case "bds.chat":
          handleListMessage(chatId);
          break;

        default:
          alert("Invalid event!");
      }
    };

    ws.current.onclose = (e) => {
      console.log(e);
    };

    ws.current.onerror = (e) => {
      console.log(e);
    };
  }, [chatId]);
  return [messages, status, handleSendMessage];
};

export default useMessenger;
