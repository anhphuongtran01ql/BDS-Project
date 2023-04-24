import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from "../../Auth/Authorization/Logout";
import { BsPostcardHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

const displayMenuItems = {
  display: "flex",
  justifyContent: "flex-start",
  color: "#616161",
};

function DropdownList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{
          borderRadius: 10,
          border: "1px solid #ddd",
        }}
        onClick={handleClick}
      >
        <Stack>
          <AiOutlineMenu size={24} />
          <FaRegUserCircle size={24} />
        </Stack>
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/post/create" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose} sx={displayMenuItems}>
            <BsPostcardHeart size={22} />
            <Typography>Create new post</Typography>
          </MenuItem>
        </Link>
        <Divider sx={{ margin: "8px 0" }} />

        <MenuItem onClick={handleClose} sx={displayMenuItems}>
          <AiOutlineMessage size={24} />
          <Typography>All message</Typography>
        </MenuItem>
        <Divider />

        <MenuItem sx={displayMenuItems}>
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
}

export default DropdownList;
