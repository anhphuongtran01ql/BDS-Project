import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import useMessenger from "../../CustomHook/useMessenger";
import "./Messenger.css";
import { useGetUserInfo } from "../Auth/Authorization/getUserInfo";
import { useEffect, useRef, useState } from "react";

const MessageBaseOnType = ({ className, message }) => {
  return <div className={className}>{message}</div>;
};

const Message = ({ chatId }) => {
  const { userId } = useGetUserInfo();
  const [messages, status, handleSendMessage] = useMessenger(chatId);
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef();
  const bottomRef = useRef(null);

  // console.log("messages", messages);

  const handleSend = () => {
    if (messageInput === "") {
      alert("Message input cannot be empty");
    } else {
      handleSendMessage(messageInput);
      setMessageInput("");
      inputRef.current.focus();
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {status === "success" && (
        <div className="message">
          <div className="msg-header">
            <div className="container1">
              <AccountCircleIcon
                sx={{
                  width: " 50px",
                  verticalAlign: "middle",
                  borderStyle: "none",
                  borderRadius: "100%",
                }}
                className="msg-image"
              />
              <div className="active ">{messages.senderName}</div>
            </div>
          </div>

          <div className="chat-page">
            <div id="test" className="msg-inbox">
              {messages.messages.map((message, index) => {
                if (userId !== message.senderId) {
                  return (
                    <div className="received-chats" key={index}>
                      <div className="received-chats-img">
                        <AccountCircleIcon
                          fontSize="large"
                          className="received-chats-img"
                        />
                      </div>
                      <div className="received-msg">
                        <div className="received-msg-inbox">
                          {message.multiple === true ? (
                            message.messages.map((item, itemIndex) => (
                              <MessageBaseOnType
                                className="received-msg-inbox-content"
                                message={item}
                                key={`${itemIndex}-left-message`}
                              />
                            ))
                          ) : (
                            <MessageBaseOnType
                              message={message.content}
                              className="received-msg-inbox-content"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="outgoing-chats" key={index}>
                      <div className="outgoing-chats-img">
                        <AccountCircleIcon
                          fontSize="large"
                          className="received-chats-img"
                        />
                      </div>
                      <div className="outgoing-chats-msg">
                        {message.multiple === true ? (
                          message.messages.map((item, itemIndex) => (
                            <MessageBaseOnType
                              className="multi-msg"
                              message={item}
                              key={`${itemIndex}-right-message`}
                            />
                          ))
                        ) : (
                          <MessageBaseOnType
                            message={message.content}
                            className="multi-msg"
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              })}
              <div ref={bottomRef}></div>
            </div>
            <div className="msg-bottom">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write message..."
                  value={messageInput}
                  ref={inputRef}
                  onKeyDown={handleEnter}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <div className="input-group-append ">
                  <span className="input-group-text send-icon ">
                    <SendIcon
                      className="bi bi-send "
                      onClick={handleSend}
                    ></SendIcon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
