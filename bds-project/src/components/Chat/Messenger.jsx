import "./Messenger.css";
import ListChat from "./ListChat";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { fetchInboxMessagesByUserId } from "../../Services/Chat/ChatServices";
import { useGetUserInfo } from "../Auth/Authorization/getUserInfo";
import { useQuery } from "@tanstack/react-query";

const Messenger = ({}) => {
  const { userId, roles } = useGetUserInfo();

  const {
    data: inboxMessages,
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["inbox_messages", userId],
    queryFn: () => fetchInboxMessagesByUserId(userId, roles), // incase user is lessor
  });

  const { id } = useParams();

  return (
    <>
      {status === "success" && (
        <div className="container">
          <div className="a" style={{ height: "100%", display: "flex" }}>
            <ListChat inboxMessages={inboxMessages} />
            <Message chatId={id ?? inboxMessages[0].chatId} />
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
