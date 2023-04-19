import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";

const item = {
  py: 1,
  px: 2,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          BDS
        </ListItem>

        <Box sx={{ bgcolor: "#101F33" }}>
          <List sx={{ margin: 0, padding: 0 }}>
            <Link to="/admin/list-users" style={{ textDecoration: "none" }}>
              <ListItem disablePadding key={1}>
                <ListItemButton
                  sx={item}
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText>Users</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/admin/list-users" style={{ textDecoration: "none" }}>
              <ListItem disablePadding key={2}>
                <ListItemButton
                  sx={item}
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText>Posts</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          </List>

          {/* <Divider sx={{ mt: 2 }} /> */}
        </Box>
      </List>
    </Drawer>
  );
}
