import "./Messenger.css";

import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import UserInbox from "./UserInbox";

const ListChat = ({ inboxMessages }) => {
  return (
    <div className="list-chat">
      <Typography
        variant="h5"
        sx={{ height: "40px", borderBottom: "1px solid #ccc" }}
      >
        Chat
      </Typography>
      <List
        sx={{
          width: 300,
          height: "95%",
          overflow: "auto",
          maxWidth: 360,
          paddingTop: 0,
        }}
      >
        {inboxMessages.map((user, index) => (
          <UserInbox key={index} indexValue={index} user={user} />
        ))}
      </List>
    </div>
  );
};

export default ListChat;
