import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { isLogged, useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { SnackBarContext } from "../../../context/snackbarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../../../Services/Chat/ChatServices";
import { useNavigate } from "react-router-dom";

const ReserveCard = ({ data }) => {
  const userInfo = useGetUserInfo();
  const logged = isLogged();
  const [snackBarStatus, setSnackBarStatus] = React.useContext(SnackBarContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createChat(userInfo.userId, data.authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (logged) {
      mutation.mutate(null, {
        onSuccess: (data) => {
          navigate(`/chat/${data.chatId}`);
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
