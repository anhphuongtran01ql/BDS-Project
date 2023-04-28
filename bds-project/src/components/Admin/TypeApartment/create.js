import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Loading from "../../Layout/Loading";
import { useContext } from "react";
import { SnackBarContext } from "../../../context/snackbarContext";
import { createNewTypeApartment } from "../../../Services/TypeApartment/TypeApartmentServices";
import * as yup from "yup";

const buttonSubmit = {
  width: "auto",
  margin: "15px auto",
  fontSize: 10,
  fontWeight: "bold",
  textTransform: "none",
};
const gridTypo = {
  display: "flex",
  alignItems: "center",
};

const validateSchema = yup.object().shape({
  typeOfApartment: yup.string().required("Type of apartment is required!"),
});

export function CreateTypeApartmentForm() {
  const { mutate } = useMutation(createNewTypeApartment);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const defaultValue = {
    typeOfApartment: "",
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setSnackBarStatus({
          msg: "Create Successfully!",
          key: Math.random(),
        });
        navigate(`/admin/list-types-apartment`);
      },
      onError: (error) => {
        //show messae fail here
        console.log("error", error);
      },
    });
  };

  return (
    <Container sx={{ padding: "10px 20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ ...gridTypo }}>
          <Controller
            control={control}
            name="typeOfApartment"
            defaultValue={defaultValue.typeOfApartment}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Type of Apartment"
                type="text"
                onChange={onChange}
                value={value}
                placeholder="Type of Apartment"
                fullWidth
                size="middle"
                error={errors.typeOfApartment ? true : false}
                helperText={
                  errors?.typeOfApartment && errors?.typeOfApartment?.message
                }
              />
            )}
          />

          <Grid item xs={12}>
            <TextField
              type="submit"
              value="Create"
              size="small"
              sx={buttonSubmit}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

function CreateTypeApartment() {
  return (
    <>
      <Link to={`/admin/list-types-apartment/create`}>
        <Button variant="contained">Add new type</Button>
      </Link>
    </>
  );
}

export default CreateTypeApartment;
