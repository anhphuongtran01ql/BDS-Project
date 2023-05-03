import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { isLogged, useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { SnackBarContext } from "../../../context/snackbarContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../../../Services/Chat/ChatServices";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { fetchInboxMessagesByUserId } from "../../../Services/Chat/ChatServices";

const ReserveCard = ({ data }) => {
  const userInfo = useGetUserInfo();
  const logged = isLogged();
  const [snackBarStatus, setSnackBarStatus] = React.useContext(SnackBarContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [chatId, setChatId] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const {
    data: inboxMessages,
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["message_start", userInfo.userId],
    queryFn: () => fetchInboxMessagesByUserId(userInfo.userId, userInfo.roles),
  });

  const mutation = useMutation({
    mutationFn: () => createChat(userInfo.userId, data.authorId),
  });

  const ws = useRef();

  const handleSendMessage = (messageInput) => {
    ws.current.send(
      JSON.stringify({
        event: "bds.chat",
        action: "SEND",
        message: messageInput,
        sender: userInfo.username,
        timestamp: new Date().toJSON(),
      })
    );
  };

  useEffect(() => {
    if (chatId !== null) {
      ws.current = new WebSocket(
        "ws:///localhost:8000/ws/chats/" + chatId + "/",
        ["Token", userInfo.username]
      );

      ws.current.onopen = () => {
        setIsConnected(true);
        console.log("connected");
      };
    }
  }, [chatId]);

  useEffect(() => {
    if (isConnected && status === "success") {
      if (inboxMessages.length === 0) {
        handleSendMessage("I need to help!");
      }
      navigate(`/chat`);
    }
  }, [isConnected, status]);

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (logged) {
      mutation.mutate(null, {
        onSuccess: (data) => {
          setChatId(data.chatId);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } else {
      setSnackBarStatus({
        msg: "You have to login to send message!",
        key: Math.random(),
      });
    }
  };

  return (
    <Card className="reserve-card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4">{data.price}đ / month</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="primary"
          disabled={userInfo && userInfo.userId === data.authorId}
          onClick={handleOnClick}
          sx={{
            width: "100%",
            background: "#FF385C",
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Send Message
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReserveCard;
