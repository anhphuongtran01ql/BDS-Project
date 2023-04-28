import { Box, Typography } from "@mui/material";
import React from "react";
import { BsDatabaseFillSlash } from "react-icons/bs";

function Nodata() {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <BsDatabaseFillSlash size={30} />
      <Typography>No data</Typography>
    </Box>
  );
}

export default Nodata;
