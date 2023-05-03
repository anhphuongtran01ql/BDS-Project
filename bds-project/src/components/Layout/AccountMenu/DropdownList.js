import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import Logout from "../../Auth/Authorization/Logout";
import { BsPostcardHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IsRoles, useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { BsFileEarmarkPost } from "react-icons/bs";

const displayMenuItems = {
  display: "flex",
  justifyContent: "flex-start",
  color: "#616161",
};

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}`,
  };
}

function DropdownList() {
  const { username, roles, userId } = useGetUserInfo();

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
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px 15px",
          }}
        >
          <AiOutlineMenu size={24} />
          {/* <FaRegUserCircle size={24} /> */}
          <Avatar
            sx={{ bgcolor: "rgb(233, 30, 99)", margin: 0 }}
            alt="user"
            {...stringAvatar(username)}
          />
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
        <MenuItem sx={{ display: "flex", justifyContent: "center" }} disabled>
          <Typography sx={{ fontWeight: 900 }}>
            {roles} | {username}
          </Typography>
        </MenuItem>
        <Divider sx={{ margin: "8px 0" }} />
        {IsRoles({
          CurrentRoles: roles,
          ValidRoles: ["mod"],
        }) && (
          <div>
            <Link
              to={`/mod/list-post/${userId}`}
              style={{ textDecoration: "none" }}
            >
              <MenuItem onClick={handleClose} sx={displayMenuItems}>
                <BsFileEarmarkPost size={24} />
                <Typography>My posts</Typography>
              </MenuItem>
            </Link>
            <Divider sx={{ margin: "8px 0" }} />

            <Link to="/post/create" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose} sx={displayMenuItems}>
                <BsPostcardHeart size={22} />
                <Typography>Create new post</Typography>
              </MenuItem>
            </Link>
            <Divider sx={{ margin: "8px 0" }} />
          </div>
        )}

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
