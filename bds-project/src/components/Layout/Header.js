import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// components
import Logo from "./Logo.js";
import { dFlex } from "../../themes/commonStyles";
import ProfileSettings from "./ProfileSettings";

const Header = () => {
  return (
    <Box
      sx={{
        ...dFlex,
        minHeight: 70,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 90,
            px: 4,
          }}
        >
          <Box>
            <Logo />
          </Box>

          <Box>
            <ProfileSettings />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
