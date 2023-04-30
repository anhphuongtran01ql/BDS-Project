import React from "react";
// react icons
import { FaFilter } from "react-icons/fa";

import TextField from "@mui/material/TextField";
import { Button, Container, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const OptionsTab = () => {
  const defaultValue = {
    post_title: "",
    details_address: "",
    number_of_rooms: "",
    typeOfApartment: "room",
    price: "",
    square_area: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl" >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{width:'80%', margin:'0 auto'}} spacing={2}>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
              <Controller
              control={control}
              name="post_title"
              defaultValue={defaultValue.post_title}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Post Title"
                  type="text"
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  placeholder="Post Title"
                  fullWidth
                />
              )}
            />
              </Grid>
              <Grid item xs={4}>
              <Controller
              control={control}
              name="details_address"
              defaultValue={defaultValue.details_address}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Details address"
                  type="text"
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  placeholder="Details address"
                  fullWidth
                />
              )}
            />
                </Grid>
                <Grid item xs={4}>
                <Controller
              control={control}
              name="number_of_rooms"
              defaultValue={defaultValue.number_of_rooms}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Number of rooms"
                  type="text"
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={value}
                  placeholder="Number of rooms"
                  fullWidth
                />
              )}
            />
                </Grid>
                <Grid item xs={4}>
                <Controller
              control={control}
              name="typeOfApartment"
              defaultValue={defaultValue.typeOfApartment}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Type of apartment"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  value={value}
                  placeholder="Type of apartment"
                  fullWidth
                />
              )}
            />
                </Grid>
                <Grid item xs={4}>
                <Controller
              control={control}
              name="price"
              defaultValue={defaultValue.price}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Price"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  value={value}
                  placeholder="Price"
                  fullWidth
                />
              )}
            />
                </Grid>
                <Grid item xs={4}>
                <Controller
              control={control}
              name="square_area"
              defaultValue={defaultValue.square_area}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Square area"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  value={value}
                  placeholder="Square area"
                  fullWidth
                />
              )}
            />
                </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} sx={{display:'flex', justifyContent:'center'}}>
            <Button
              type="submit"
              sx={{
                display: { xs: "none", md: "block" },
                // marginLeft: 3,
                border: "1px solid #ddd",
                minWidth: 90,
                maxHeight:'30%',
                justifyContent: "space-between",
                borderRadius: 2,
                textTransform: "capitalize",
                py: 1,
                color: "theme.palette.text.primary",
              }}
            >
              <FaFilter /> Filters
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default OptionsTab;
