import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { justifyCenter } from "../../themes/commonStyles";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../Services/Auth/Login";
import { useContext } from "react";
import { SnackBarContext } from "../../context/snackbarContext";
import ParseJwt from "./ParseJwt";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BDS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const mutation = useMutation(login);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutation.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.access_token)
        );
        setSnackBarStatus({ msg: "Login Successfully!", key: Math.random() });
        let userIdentity = ParseJwt(res.data.access_token);
        if (userIdentity.roles.toString() === "admin") {
          navigate("/admin/list-users");
        }
        if (userIdentity.roles.toString() === "lessor") {
          navigate("/lessor");
        }
        if (userIdentity.roles.toString() === "tenant") {
          navigate("/tenant");
        }
      },
      onError: (error) => {
        setEmailErrorText("Invalid email! Please enter again!");
        setPasswordErrorText("Invalid password! Please enter again!");
        setSnackBarStatus({ msg: "Failed to login!", key: Math.random() });
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={!!emailErrorText}
                helperText={emailErrorText}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!passwordErrorText}
                helperText={passwordErrorText}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleSubmit}
              >
                Sign In
              </LoadingButton>

              <Grid container sx={{ ...justifyCenter }}>
                <Grid item>
                  <Link href="#">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
