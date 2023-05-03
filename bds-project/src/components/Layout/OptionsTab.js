import React, { useEffect } from "react";
// react icons
import { FaFilter } from "react-icons/fa";

import TextField from "@mui/material/TextField";
import { Button, Container, Grid, MenuItem, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { filterPost } from "../../Services/Post/PostServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FilterPost from "../Post/Filter/FilterPost";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchAllTypeApartments } from "../../Services/TypeApartment/TypeApartmentServices";

const OptionsTab = () => {
  const { data: typeOfApartment, status } = useQuery({
    queryKey: ["typesApartment"],
    queryFn: () => fetchAllTypeApartments(),
  });
  const defaultValue = {
    post_title: "",
    details_address: "",
    number_of_rooms: "",
    typeOfApartment:
      status === "success" ? typeOfApartment[0].typeOfApartment : "room",
    price: "",
    square_area: "",
  };
  const navigate = useNavigate();
  const { mutate } = useMutation(filterPost);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  // console.log("filterPosts", filterPosts);

  const santizeData = (data, item) => {
    switch (item) {
      case "number_of_rooms":
      case "price":
      case "square_area":
        return Number(data[item]);
      default:
        return data[item];
    }
  };

  const onSubmit = (data) => {
    const keys = Object.keys(data);
    const result = keys.reduce((total, item, index) => {
      if (data[item]) {
        return { ...total, [item]: santizeData(data, item) };
      }
      return total;
    }, {});

    mutate(result, {
      onSuccess: (data) => {
        console.log("data success", data);
        <FilterPost data={data} />;
        navigate("/post/filter", { state: data });
      },
      onError: (error) => {
        //show messae fail here
        console.log("error", error);
      },
    });
  };

  return (
    <Container
      sx={{
        paddingLeft: 0,
        paddingRight: { xs: "30px", sm: "50px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ margin: "0 auto" }} spacing={2}>
          <Grid container sx={{ margin: "0 auto" }} spacing={2}>
            <Grid item xs={6} sm={6}>
              <Controller
                control={control}
                name="post_title"
                defaultValue={defaultValue.post_title}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
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
            <Grid item xs={6} sm={6}>
              <Controller
                control={control}
                name="details_address"
                defaultValue={defaultValue.details_address}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
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
            <Grid item xs={6} sm={3}>
              <Controller
                control={control}
                name="number_of_rooms"
                defaultValue={defaultValue.number_of_rooms}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
                    label="Number of rooms"
                    type="number"
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
            <Grid item xs={6} sm={3}>
              <Controller
                control={control}
                name="typeOfApartment"
                defaultValue={defaultValue.typeOfApartment}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
                    label="Type of apartment"
                    select
                    onChange={onChange}
                    value={value}
                    fullWidth
                  >
                    {typeOfApartment?.map((item, index) => (
                      <MenuItem value={item.typeOfApartment} key={index}>
                        {item.typeOfApartment}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Controller
                control={control}
                name="price"
                defaultValue={defaultValue.price}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
                    label="Price"
                    type="number"
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
            <Grid item xs={6} sm={3}>
              <Controller
                control={control}
                name="square_area"
                defaultValue={defaultValue.square_area}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    size="small"
                    label="Square area"
                    type="number"
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

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid #ddd",
                minWidth: 75,
                maxHeight: "80%",
                borderRadius: 2,
                textTransform: "capitalize",
                py: 1,
                color: "theme.palette.text.primary",
              }}
            >
              <FaFilter />
              <Typography>Filters</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default OptionsTab;
