import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { justifyCenter } from "../../themes/commonStyles";
import { useMutation } from "@tanstack/react-query";
import { SnackBarContext } from "../../context/snackbarContext";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validateSchema from "../Admin/Users/validate";
import { Button, MenuItem, Select } from "@mui/material";
import { genders } from "../../data/data";
import { register } from "../../Services/Auth/Login";

const textField = {
  marginBottom: 2,
};

export const rolesList = [
  { roleCode: "mod", roleName: "mod" },
  { roleCode: "member", roleName: "member" },
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
          color: "rgba(0, 0, 0, 0.6)",
          fontWeight: "bold",
        }}
      >
        BDS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const { mutate } = useMutation(register);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);

  const defaultValue = {
    username: "",
    password: "",
    fullName: "",
    gender: "Male",
    email: "",
    address: "",
    roleList: rolesList[0].roleCode,
    enable: true,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultValue,
  });

  const onSubmit = (data) => {
    const rolesList = [
      { roleCode: `${data.roleList}`, roleName: `${data.roleList}` },
    ];

    data.roleList = rolesList;

    mutate(data, {
      onSuccess: (data) => {
        setSnackBarStatus({
          msg: "Register Successfully!",
          key: Math.random(),
        });
      },
      onError: (error) => {
        //show messae fail here
        console.log("error", error);
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
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: "10px", paddingBottom: "10px" }}
            >
              Sign up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="username"
                defaultValue={defaultValue.username}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={textField}
                    fullWidth
                    autoFocus
                    label="Username"
                    type="username"
                    onChange={onChange}
                    value={value}
                    placeholder="Username"
                    size="small"
                    error={errors.username ? true : false}
                    helperText={errors?.username && errors?.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                defaultValue={defaultValue.password}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={textField}
                    fullWidth
                    label="Password"
                    type="password"
                    onChange={onChange}
                    value={value}
                    placeholder="Password"
                    size="small"
                    error={errors.password ? true : false}
                    helperText={errors?.password && errors?.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="fullName"
                defaultValue={defaultValue.fullName}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={textField}
                    fullWidth
                    label="Full name"
                    type="fullName"
                    onChange={onChange}
                    value={value}
                    placeholder="Full name"
                    size="small"
                    error={errors.fullName ? true : false}
                    helperText={errors?.fullName && errors?.fullName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="gender"
                defaultValue={defaultValue.gender}
                render={({ field: { onChange, value } }) => (
                  <Select
                    sx={textField}
                    fullWidth
                    id="select-gender"
                    select
                    value={value}
                    onChange={onChange}
                    size="small"
                  >
                    {genders.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="email"
                defaultValue={defaultValue.email}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={textField}
                    label="Email"
                    type="email"
                    onChange={onChange}
                    value={value}
                    placeholder="Email"
                    fullWidth
                    size="small"
                    error={errors.email ? true : false}
                    helperText={errors?.email && errors?.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="address"
                defaultValue={defaultValue.address}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Address"
                    type="address"
                    onChange={onChange}
                    value={value}
                    placeholder="Address"
                    fullWidth
                    size="small"
                    sx={textField}
                    multiline
                    rows={2}
                    error={errors.address ? true : false}
                    helperText={errors?.address && errors?.address?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="roleList"
                defaultValue={defaultValue.roleList}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="select-roleList"
                    select
                    value={value}
                    onChange={onChange}
                    sx={textField}
                    size="small"
                  >
                    {rolesList.map((item, index) => (
                      <MenuItem value={item.roleCode} key={index}>
                        {item.roleName}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>

            <Grid container sx={{ ...justifyCenter }}>
              <Grid item>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 1 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
