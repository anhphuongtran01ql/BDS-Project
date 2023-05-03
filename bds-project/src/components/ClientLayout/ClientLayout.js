import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { Outlet } from "react-router-dom";

import { displayOnDesktop } from "../../themes/commonStyles";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MobileFooter from "../Layout/MobileFooter";
import FooterMenu from "../Layout/FooterMenu";
import OptionsTab from "../Layout/OptionsTab";
import { useLocation } from "react-router-dom";

const ClientLayout = () => {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: 100,
            overflowY: "scroll",
          }}
        >
          {location.pathname === "/" ? (
            <Box
              sx={{
                padding: "10px 0",
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
              }}
            >
              <OptionsTab />
            </Box>
          ) : null}

          <Container maxWidth="xl" sx={{ mb: 3 }}>
            <Outlet />

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <MobileFooter />
            </Box>
          </Container>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <FooterMenu />
        </Box>
        <Box sx={displayOnDesktop}>
          <Footer />
        </Box>
      </Box>
    </>
  );
};
export default ClientLayout;
