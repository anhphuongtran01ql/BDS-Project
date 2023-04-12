import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  GetCurrentRoles,
  GetCurrentUsername,
} from "../../Auth/Authorization/getUserInfo";
function Header(props) {
  const { onDrawerToggle } = props;

  const username = GetCurrentUsername();
  const role = GetCurrentRoles();

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { md: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Welcome {role[0]} {username}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          {/* <Tab label="Usage" /> */}
        </Tabs>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
