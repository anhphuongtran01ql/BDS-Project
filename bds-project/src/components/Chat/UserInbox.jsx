import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";

const UserInbox = ({ user, indexValue }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClickMessage = (user) => () => {
    navigate(`/chat/${user.chatId}`);
  };
  return (
    <ListItem
      alignItems="flex-start"
      style={{ paddingTop: indexValue === 0 ? 0 : "4px" }}
      sx={{ paddingRight: 0, paddingLeft: 0, paddingBottom: 0 }}
    >
      <ListItemButton
        selected={user.chatId === Number(id)}
        onClick={handleClickMessage(user)}
        sx={{ paddingBottom: 0 }}
        dense
      >
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="h6" sx={{ paddingTop: "3px" }}>
                {user.receiverName}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.messages[user.messages.length - 1].content}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default UserInbox;