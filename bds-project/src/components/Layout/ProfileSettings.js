import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// react icons
import { flexCenter } from "../../themes/commonStyles";
import Notification from "./Notification/Notification";
import DropdownList from "./AccountMenu/DropdownList";
import { isLogged } from "../Auth/Authorization/getUserInfo";

const ProfileSettings = () => {
  const isLog = isLogged();

  return (
    <Box sx={flexCenter}>
      {isLog === false && (
        <Link to={`/login`} style={{ textDecoration: "none", marginRight: 10 }}>
          <p>Become A Host</p>
        </Link>
      )}
      {isLog === true && (
        <Stack>
          <Button>
            <Notification />
          </Button>
          <DropdownList />
        </Stack>
      )}
    </Box>
  );
};

export default ProfileSettings;
