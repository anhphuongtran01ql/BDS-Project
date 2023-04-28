import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import Container from "@mui/material/Container";
import { typographyTextAlignLeft } from "../../../themes/commonStyles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { editPost, fetchPostById } from "../../../Services/Post/PostServices";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import NumericFormatCustom from "../../../Helper/NumericFormatCustom";
import RequiredComponent from "../../../Helper/RequiredComponent";
import editPostSchema from "./editPostSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { SnackBarContext } from "../../../context/snackbarContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Layout/Loading";

const EditPost = () => {
  const { mutate } = useMutation(editPost);
  const navigate = useNavigate();
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [videosUpload, setVideosUpload] = useState([]);
  const { userId } = useGetUserInfo() ?? 2;
  const { id } = useParams();

  const {
    data: postData,
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(editPostSchema),
  });

  useEffect(() => {
   if(status === 'success') {
    reset({...postData, images:[], video:[]});
   }
  }, [status, postData]);

  const TYPE_OF_APARTMENT = ["room", "apartment"];

  const handleFileUpload = (e) => {
    e.preventDefault();
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

    const json = JSON.stringify(tempData);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const formData = new FormData();

    data.video.forEach((file) => {
      formData.append(`video`, file, file.name);
    });

    data.images.forEach((file) => {
      formData.append(`images`, file, file.name);
    });

    formData.append("postDTO", blob);
    mutate(formData, {
      onSuccess: (data) => {
        setSnackBarStatus({
          msg: "Edit Successfully!",
          key: Math.random(),
        });
        navigate(`/`);
      },
      onError: (error) => {
        setSnackBarStatus({
            msg: "Edit Failed!",
            key: Math.random(),
          });
      },
    });
  };

  return (
    <>
      {status === 'success' &&  <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth="lg">
            <Card
              className="card-common"
              sx={{ minWidth: 275, marginTop: "30px" }}
            >
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
                    <Typography
                      variant="h6"
                      style={{ ...typographyTextAlignLeft }}
                    >
                      Title
                      <RequiredComponent />
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={9}>
                    <Controller
                      control={control}
                      name="postTitle"
                      defaultValue={postData?.postTitle}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          onChange={onChange}
                          fullWidth
                          error={!!errors.postTitle}
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
                      defaultValue={postData?.numberOfRooms}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          onChange={onChange}
                          type="number"
                          error={!!errors.numberOfRooms}
                          helperText={
                            errors?.numberOfRooms &&
                            errors?.numberOfRooms?.message
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
                      defaultValue={postData?.squareArea}
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
                          error={!!errors.squareArea}
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
                      defaultValue={postData?.price}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          onChange={onChange}
                          name="price"
                          InputProps={{
                            inputComponent: NumericFormatCustom,
                            endAdornment: (
                              <InputAdornment position="end">
                                VNĐ
                              </InputAdornment>
                            ),
                          }}
                          error={!!errors.price}
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
                      defaultValue={postData?.detailsAddress}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          onChange={onChange}
                          fullWidth
                          error={!!errors.detailsAddress}
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
                      defaultValue={postData?.typeOfApartment}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          fullWidth
                          id="select-type-of-apartment"
                          select
                          value={value}
                          onChange={onChange}
                          error={!!errors.typeOfApartment}
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
                      defaultValue={postData?.description}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                          variant="outlined"
                          onChange={onChange}
                          multiline
                          error={!!errors.description}
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
                      name="images"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Button variant="contained" component="label">
                          Upload Image
                          <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
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
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Button variant="contained" component="label">
                          Upload Video
                          <input
                            type="file"
                            hidden
                            multiple
                            accept="video/*"
                            onChange={handleVideoUpload}
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
                            <div
                              style={{
                                display: "inline-block",
                                position: "relative",
                              }}
                            >
                              <Box>{item.name}</Box>
                              <CancelIcon
                                sx={{ marginLeft: "5px", color: "#616161" }}
                                size="small"
                                onClick={handleRemoveVideo(item)}
                                className="icon-close"
                              />
                            </div>
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
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Container>
        </form>}
    </>
  );
};
export default EditPost;
