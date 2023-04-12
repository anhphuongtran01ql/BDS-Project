import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../../Services/User/UserServices";

export default function Content() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUsers(),
  });
  // console.log("data", data);
  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <>
          <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <AppBar
              position="static"
              color="default"
              elevation={0}
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon color="inherit" sx={{ display: "block" }} />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Search by name..."
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: "default" },
                      }}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Typography
              sx={{ my: 5, mx: 2 }}
              color="text.secondary"
              align="center"
            >
              No users for this project yet
            </Typography>
          </Paper>
        </>
      )}
    </>
  );
}
