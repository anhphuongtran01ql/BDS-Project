import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import Container from "@mui/material/Container";
import { typographyTextAlignLeft } from "../../../themes/commonStyles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { createPost } from "../../../Services/Post/PostServices";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import NumericFormatCustom from "../../../Helper/NumericFormatCustom";
import RequiredComponent from "../../../Helper/RequiredComponent";
import createPostSchema from "./createPostSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { SnackBarContext } from "../../../context/snackbarContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { mutate } = useMutation(createPost);
  const navigate = useNavigate();
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [videosUpload, setVideosUpload] = useState([]);
  const { userId } = useGetUserInfo();
  const defaultValue = {
    postTitle: "",
    description: "",
    numberOfRooms: "",
    squareArea: 0,
    price: "",
    detailsAddress: "",
    typeOfApartment: "Room",
    authorId: "",
    images: [],
    video: [],
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: defaultValue,
  });
  const TYPE_OF_APARTMENT = ["Room", "Apartment"];

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const files = Object.values(e.target.files);
    let imagesData = [];
    files.forEach((file, index) => {
      imagesData = [
        ...imagesData,
        { name: file.name, src: URL.createObjectURL(file) },
      ];
    });
    setValue("images", [...getValues("images"), ...files]);
    setImagesUpload([...imagesUpload, ...imagesData]);
  };

  const handleVideoUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const files = Object.values(e.target.files);
    let videosData = [];
    files.forEach((file, index) => {
      videosData = [
        ...videosData,
        { name: file.name, src: URL.createObjectURL(file) },
      ];
    });
    setValue("video", [...getValues("video"), ...files]);
    setVideosUpload([...videosUpload, ...videosData]);
  };

  const handleRemoveImage = (image) => () => {
    setImagesUpload(imagesUpload.filter((item) => item.name !== image.name));
    setValue(
      "images",
      getValues("images").filter((item) => item.name !== image.name)
    );
  };

  const handleRemoveVideo = (video) => () => {
    setVideosUpload(videosUpload.filter((item) => item.name !== video.name));
    setValue(
      "video",
      getValues("video").filter((item) => item.name !== video.name)
    );
  };

  const onSubmit = (data) => {
    const additionalData = {
      authorId: userId,
    };
    const finalData = { ...data, ...additionalData };
    var tempData = { ...finalData };
    finalData.postDTO = { ...tempData };
    delete finalData.postDTO.images;
    delete finalData.postDTO.video;
    finalData.postDTO = JSON.stringify(finalData.postDTO);
    console.log("data", typeof finalData.postDTO);
    mutate(finalData, {
      onSuccess: (data) => {
        setSnackBarStatus({
          msg: "Create Successfully!",
          key: Math.random(),
        });
        navigate(`/`);
      },
      onError: (error) => {
        //show messae fail here
        console.log("error", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="lg">
        <Card className="card-common" sx={{ minWidth: 275, marginTop: "30px" }}>
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}
            >
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Create Post
                </Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography variant="h6" style={{ ...typographyTextAlignLeft }}>
                  Title
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="postTitle"
                  defaultValue={defaultValue.postTitle}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      fullWidth
                      error={errors.postTitle ? true : false}
                      helperText={
                        errors?.postTitle && errors?.postTitle?.message
                      }
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Number of rooms
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="numberOfRooms"
                  defaultValue={defaultValue.numberOfRooms}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      type="number"
                      error={errors.numberOfRooms ? true : false}
                      helperText={
                        errors?.numberOfRooms && errors?.numberOfRooms?.message
                      }
                      fullWidth
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Square area
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="squareArea"
                  defaultValue={defaultValue.squareArea}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      name="squareArea"
                      InputProps={{
                        inputComponent: NumericFormatCustom,
                        endAdornment: (
                          <InputAdornment position="end">m2</InputAdornment>
                        ),
                      }}
                      error={errors.squareArea ? true : false}
                      helperText={
                        errors?.squareArea && errors?.squareArea?.message
                      }
                      fullWidth
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Price
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="price"
                  defaultValue={defaultValue.price}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      name="price"
                      InputProps={{
                        inputComponent: NumericFormatCustom,
                        endAdornment: (
                          <InputAdornment position="end">VNĐ</InputAdornment>
                        ),
                      }}
                      error={errors.price ? true : false}
                      helperText={errors?.price && errors?.price?.message}
                      fullWidth
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Detail Address
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="detailsAddress"
                  defaultValue={defaultValue.detailsAddress}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      fullWidth
                      error={errors.detailsAddress ? true : false}
                      helperText={
                        errors?.detailsAddress &&
                        errors?.detailsAddress?.message
                      }
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Type of Apartment
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="typeOfApartment"
                  defaultValue={defaultValue.typeOfApartment}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      fullWidth
                      id="select-type-of-apartment"
                      select
                      value={value}
                      onChange={onChange}
                      error={errors.typeOfApartment ? true : false}
                      helperText={
                        errors?.typeOfApartment &&
                        errors?.typeOfApartment?.message
                      }
                    >
                      {TYPE_OF_APARTMENT.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Description
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={9}>
                <Controller
                  control={control}
                  name="description"
                  defaultValue={defaultValue.description}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      variant="outlined"
                      onChange={onChange}
                      multiline
                      error={errors.description ? true : false}
                      helperText={
                        errors?.description && errors?.description?.message
                      }
                      rows={4}
                      fullWidth
                      value={value}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Image
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: { sm: "flex" } }} sm={9}>
                <Controller
                  control={control}
                  name="description"
                  defaultValue={defaultValue.images}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Button variant="contained" component="label">
                      Upload Image
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        error={errors.images ? true : false}
                        helperText={errors?.images && errors?.images?.message}
                      />
                    </Button>
                  )}
                />
              </Grid>

              <Grid item sm={3}></Grid>
              <Grid item xs={12} sx={{ minHeight: 250 }} sm={9}>
                <Grid container spacing={2}>
                  {imagesUpload.length > 0 &&
                    imagesUpload.map((item, index) => (
                      <Grid item sm={12} md={6} lg={4} xs={12} key={index}>
                        <div
                          style={{
                            display: "inline-block",
                            position: "relative",
                          }}
                        >
                          <img
                            width={200}
                            style={{ objectFit: "contain" }}
                            height={200}
                            src={item.src}
                            alt={`images-${index}`}
                          />
                          <CancelIcon
                            onClick={handleRemoveImage(item)}
                            className="icon-close"
                          />
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h6"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  Video
                  <RequiredComponent />
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: { sm: "flex" } }} sm={9}>
                <Controller
                  control={control}
                  name="video"
                  defaultValue={defaultValue.video}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Button variant="contained" component="label">
                      Upload Video
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="video/*"
                        onChange={handleVideoUpload}
                        error={errors.video ? true : false}
                        helperText={errors?.video && errors?.video?.message}
                      />
                    </Button>
                  )}
                />
              </Grid>

              <Grid item sm={3}></Grid>
              <Grid item xs={12} sx={{ minHeight: 100 }} sm={9}>
                <Grid container spacing={2}>
                  {videosUpload.length > 0 &&
                    videosUpload.map((item, index) => (
                      <Grid item sm={12} md={6} lg={4} xs={12} key={index}>
                        <Box sx={{ display: "flex" }}>
                          <Box>{item.name}</Box>
                          <CancelIcon
                            sx={{ marginLeft: "5px", color: "#616161" }}
                            size="small"
                            onClick={handleRemoveVideo(item)}
                          />
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              size="small"
              variant="primary"
              sx={{
                width: "auto",
                margin: "0 auto",
                background: "#FF385C",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </Container>
    </form>
  );
};
export default CreatePost;
