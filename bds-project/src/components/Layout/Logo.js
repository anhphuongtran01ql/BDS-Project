import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// react icons
import { FaHome } from "react-icons/fa";
import { flexCenter } from "../../themes/commonStyles";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box sx={flexCenter}>
        <FaHome size={40} color={pink[500]} />
        <Typography
          sx={{
            ml: 1,
            color: (theme) => theme.palette.secondary.main,
            fontSize: "20px",
            fontWeight: "bold",
          }}
          component="h3"
        >
          BDS
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
