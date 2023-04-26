import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUser, fetchUserById } from "../../../Services/User/UserServices";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validateSchema, { validateEditSchema } from "./validate";
import TextField from "@mui/material/TextField";
import { rolesList, genders } from "../../../data/data";
import Loading from "../../Layout/Loading";
import { useContext } from "react";
import { SnackBarContext } from "../../../context/snackbarContext";

const textField = {
  marginBottom: 1,
};
const buttonSubmit = {
  width: "auto",
  margin: "0 auto",
  fontSize: 10,
  fontWeight: "bold",
  textTransform: "none",
};
const textTypo = {
  display: "flex",
  textAlign: "center",
  marginLeft: "5px",
};
const gridTypo = {
  display: "flex",
  alignItems: "center",
};
const gridTextField = {
  marginTop: "8px",
};

export function UserInfo() {
  const { userId } = useParams();
  const { mutate } = useMutation(editUser);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateEditSchema),
  });
  const defaultValue = {
    username: user?.username,
    password: user?.password,
    fullName: user?.fullName,
    gender: user?.gender,
    email: user?.email,
    address: user?.address,
    roleList: user?.roleList[0].roleCode,
    enable: true,
  };

  const onSubmit = (data) => {
    const rolesList = [
      { roleCode: `${data.roleList}`, roleName: `${data.roleList}` },
    ];

    data.roleList = rolesList;

    const customData = { ...data, password: user.password };
    console.log("data", customData);
    mutate(customData, {
      onSuccess: () => {
        setSnackBarStatus({
          msg: "Create Successfully!",
          key: Math.random(),
        });
        navigate(`/admin/list-users`);
      },
      onError: (error) => {
        //show messae fail here
        console.log("error", error);
      },
    });
  };

  return (
    <>
      {isFetching || isLoading ? (
        <Loading />
      ) : (
        <>
          <Container sx={{ padding: "10px 20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} sx={{ ...gridTypo }}>
                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} style={{ ...gridTextField }}>
                  <Controller
                    control={control}
                    name="username"
                    defaultValue={defaultValue.username}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Username"
                        type="text"
                        onChange={onChange}
                        value={value}
                        placeholder="Username"
                        fullWidth
                        size="small"
                        sx={textField}
                        disabled
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Full name:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} sx={{ ...gridTextField }}>
                  <Controller
                    control={control}
                    name="fullName"
                    defaultValue={defaultValue.fullName}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Full name"
                        type="text"
                        onChange={onChange}
                        value={value}
                        placeholder="Full name"
                        fullWidth
                        size="small"
                        sx={textField}
                        error={errors.fullName ? true : false}
                        helperText={
                          errors?.fullName && errors?.fullName?.message
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Gender:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} sx={{ ...gridTextField }}>
                  <Controller
                    control={control}
                    name="gender"
                    defaultValue={defaultValue.gender}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        fullWidth
                        id="select-gender"
                        select
                        value={value}
                        onChange={onChange}
                        sx={textField}
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
                </Grid>

                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} sx={{ ...gridTextField }}>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue={defaultValue.email}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Email"
                        type="email"
                        onChange={onChange}
                        value={value}
                        placeholder="Email"
                        fullWidth
                        size="small"
                        sx={textField}
                        error={errors.email ? true : false}
                        helperText={errors?.email && errors?.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Address:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} sx={{ ...gridTextField }}>
                  <Controller
                    control={control}
                    name="address"
                    defaultValue={defaultValue.address}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Address"
                        type="text"
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
                </Grid>

                <Grid item xs={12} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Role:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} xl={11} sx={{ ...gridTextField }}>
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
                </Grid>

                <Grid item xs={3} sm={2} xl={1}>
                  <Typography sx={{ ...textTypo }} variant="body1">
                    Enable:
                  </Typography>
                </Grid>
                <Grid>
                  <Controller
                    control={control}
                    name="enable"
                    defaultValue={defaultValue.enable}
                    render={({ field: { onChange, value } }) => (
                      <Switch checked onChange={onChange} />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="submit"
                    value="Edit"
                    size="small"
                    sx={buttonSubmit}
                  />
                </Grid>
              </Grid>
            </form>
          </Container>
        </>
      )}
    </>
  );
}

function UserDetailInfo({ userId }) {
  return (
    <>
      <Link to={`/admin/list-users/${userId}`}>
        <Button>
          <BiDetail size={18} style={{ marginRight: 5 }} />
        </Button>
      </Link>
    </>
  );
}

export default UserDetailInfo;
