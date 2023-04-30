import React from "react";
import LocationCards from "./LocationCards";
import OptionsTab from "./OptionsTab";
import { Divider } from "@mui/material";

function Homepage() {
  return (
    <>
      <OptionsTab />
      <Divider sx={{width:'80%', margin:'0 auto'}}/>
      <LocationCards />
    </>
  );
}

export default Homepage;
