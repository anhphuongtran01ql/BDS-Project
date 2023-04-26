import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Loading from "../../Layout/Loading";
import { useContext } from "react";
import { SnackBarContext } from "../../../context/snackbarContext";
import {
  editTypeApartment,
  fetchTypeApartmentById,
} from "../../../Services/TypeApartment/TypeApartmentServices";
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

export function EditTypeApartmentForm() {
  const { id } = useParams();
  const { mutate } = useMutation(editTypeApartment);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["typeApartment", id],
    queryFn: () => fetchTypeApartmentById(id),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const defaultValue = {
    typeOfApartment: data?.typeOfApartment,
  };

  const onSubmit = (data) => {
    const customData = { ...data, ...{ id: id } };

    console.log("data", customData);
    mutate(customData, {
      onSuccess: () => {
        setSnackBarStatus({
          msg: "Edit Successfully!",
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
    <>
      {isFetching || isLoading ? (
        <Loading />
      ) : (
        <>
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
                        errors?.typeOfApartment &&
                        errors?.typeOfApartment?.message
                      }
                    />
                  )}
                />

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

function EditTypeApartment({ typeId }) {
  return (
    <>
      <Link to={`/admin/list-types-apartment/${typeId}`}>
        <Button>
          <FaRegEdit
            size={18}
            style={{ display: "flex", justifyContent: "flex-start" }}
          />
        </Button>
      </Link>
    </>
  );
}

export default EditTypeApartment;
