import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// react icons
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { flexCenter } from "../../themes/commonStyles";
import Notification from "./Notification/Notification";

const ProfileSettings = () => {
  return (
    <Box sx={flexCenter}>
      <Link to={`/login`} style={{ textDecoration: "none", marginRight: 10 }}>
        <p>Become A Host</p>
      </Link>
      <Stack>
        <Button>
          <Notification/>
        </Button>
        <Button
          sx={{
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        >
          <Stack>
            <AiOutlineMenu size={24} />
            <FaRegUserCircle size={24} />
          </Stack>
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileSettings;
