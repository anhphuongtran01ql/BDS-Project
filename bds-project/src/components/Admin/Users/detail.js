import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../../Services/User/UserServices";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validateSchema from "./validate";
import TextField from "@mui/material/TextField";

const textField = {
  marginBottom: 2,
};
const buttonSubmit = {
  display: "flex",
  justifyContent: "flex-start",
};

export function UserInfo() {
  const { userId } = useParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  // console.log("data", data);
  // const defaultValue = {
  //   username: "",
  //   fullName: "",
  //   gender: "Male",
  //   address: "",
  //   roleName: "",
  //   enable: 1,
  // };

  const onSubmit = () => {
    console.log("success");
  };

  return (
    <>
      {isFetching || isLoading ? (
        <>Loading</>
      ) : (
        <>
          <Container sx={{ padding: "10px 20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} md={3} lg={4}>
                <Controller
                  control={control}
                  name="email"
                  // defaultValue={defaultValue.email}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Email"
                      type="email"
                      onChange={onChange}
                      value={value}
                      placeholder="Email"
                      variant="outlined"
                      // fullWidth
                      size="small"
                      // sx={textField}
                    />
                  )}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </Grid>

              <Controller
                control={control}
                name="address"
                // defaultValue={defaultValue.address}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Address"
                    type="address"
                    onChange={onChange}
                    value={value}
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={textField}
                  />
                )}
              />
              {errors.email && <p>{errors.email.message}</p>}

              <TextField
                type="submit"
                className="button-confirm-booking"
                value="Confirm"
                size="small"
                // sx={buttonSubmit}
              />
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
