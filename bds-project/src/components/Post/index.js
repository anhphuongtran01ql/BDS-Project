import "./index.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../Services/Post/PostServices";
import { useQuery } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import {
  justifyCenter,
  typographyTextAlignLeft,
} from "../../themes/commonStyles";
import { Divider } from "@mui/material";
import ShowAllImage from "./Detail/ShowAllImage";

import AppsIcon from "@mui/icons-material/Apps";
import { useTheme } from "@mui/styles";
import ImageComponent from "./Detail/ImageComponent";
import Typography from "@mui/material/Typography";
import ReserveCard from "./Detail/ReserveCard";
import ReviewsComponent from "./Detail/ReviewsComponent";
import NoImage from "../../../src/assets/No_Image_Available.jpg";

function DetailsPost() {
  const { postId } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [imagePreview, setImagePreview] = useState({});
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.up("sm"));
  const [reviews, setReviews] = useState(0);
  const [imageData, setImageData] = useState([]);
  const { data, isLoading, isFetching, status } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  // const data = postData;
  const handleClickShowAll = () => {
    setShowAll(!showAll);
  };

  const handleImagePreview = (img) => {
    setImagePreview(img);
    setShowPreviewImage(true);
  };

  const setTotalReview = (totalReviews) => {
    setReviews(totalReviews);
  };

  useEffect(() => {
    if (status === "success" && setImageData.length < 5) {
      let tempImagedata = [...data.imageUrls];
      for (let i = 0; i < 5; i++) {
        if (tempImagedata[i] === undefined) {
          tempImagedata[i] = NoImage;
        }
      }
      setImageData(tempImagedata);
    }
  }, [status, data]);

  //check data.imageUrls.length = 0 then must show one image

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={2}
              sx={{ ...justifyCenter }}
              style={{ paddingTop: "90px" }}
            >
              <Grid item xs={12}>
                {/* fix logic here */}
                <Typography
                  variant="h3"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  {data.postTitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <div style={{ position: "relative" }}>
                  <ImageComponent
                    // ref={useRef().current}
                    image={data?.imageUrls[0] ?? NoImage}
                    style={{
                      borderRadius: 4,
                      display: "block",
                      width: "100%",
                    }}
                    height={matchesXs ? "500px" : "200px"}
                    onPreviewClick={handleImagePreview}
                  />
                  {!matchesXs && (
                    <Button
                      variant="outlined"
                      className="button-show-all-image"
                      onClick={handleClickShowAll}
                    >
                      <AppsIcon
                        fontVariant="outlined"
                        style={{ ...justifyCenter, marginRight: 5 }}
                      />
                      Show all photos
                    </Button>
                  )}
                </div>
              </Grid>
              {matchesXs && (
                <Grid item xs={5}>
                  <ImageList
                    sx={{
                      width: { xs: "200px", sm: 500 },
                      overflowY: "unset",
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                    cols={matchesXs ? 2 : 1}
                    gap={10}
                  >
                    {imageData.length > 0 &&
                      imageData.map((item, index) => {
                        if (index !== 0 && index < 5) {
                          if (index === 4) {
                            return (
                              <div style={{ position: "relative" }} key={index}>
                                <ImageListItem>
                                  <ImageComponent
                                    image={item}
                                    height={245}
                                    style={{
                                      borderRadius: 4,
                                    }}
                                    onPreviewClick={handleImagePreview}
                                  />
                                </ImageListItem>
                                <Button
                                  variant="outlined"
                                  className="button-show-all-image"
                                  onClick={handleClickShowAll}
                                >
                                  <AppsIcon
                                    fontVariant="outlined"
                                    style={{ ...justifyCenter, marginRight: 5 }}
                                  />
                                  Show all photos
                                </Button>
                              </div>
                            );
                          }
                          return (
                            <ImageListItem key={index}>
                              <ImageComponent
                                image={item}
                                style={{
                                  borderRadius: 4,
                                  display: "block",
                                  width: "100%",
                                }}
                                height={245}
                                onPreviewClick={handleImagePreview}
                              />
                            </ImageListItem>
                          );
                        }
                      })}
                  </ImageList>
                </Grid>
              )}

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          style={{ ...typographyTextAlignLeft }}
                        >
                          {data.detailsAddress}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{
                            ...typographyTextAlignLeft,
                            color: "#222222",
                            opacity: 0.7,
                          }}
                          gutterBottom
                        >
                          <ul>
                            <li>{data.typeOfApartment}</li>
                            <li> - {data.numberOfRooms} rooms</li>
                            <li> - {data.squareArea} m2</li>
                          </ul>
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              variant="h4"
                              style={{ ...typographyTextAlignLeft }}
                            >
                              BDS
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ textAlign: "left" }}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            ></div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={1} />
                  <Grid item xs={12} sm={4}>
                    <ReserveCard data={data} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  style={{ ...typographyTextAlignLeft }}
                  gutterBottom
                >
                  {reviews} Reviews
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ReviewsComponent setTotalReview={setTotalReview} />
              </Grid>
            </Grid>
          </Container>
          <Modal
            open={showAll}
            onClose={() => setShowAll(false)}
            slotProps={{
              backdrop: {
                style: { backgroundColor: "white" },
              },
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              overflowY: "auto",
              display: "flex",
              width: "60%",
              margin: "90px auto",
            }}
          >
            <ShowAllImage
              itemData={data.imageUrls}
              // ref={useRef().current}
            />
          </Modal>

          {/*show preview image*/}
          <Modal
            open={showPreviewImage}
            onClose={() => setShowPreviewImage(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              margin: "0 auto",
            }}
          >
            <ImageComponent
              //   ref={useRef().current}
              image={imagePreview}
              style={{
                borderRadius: 4,
                display: "block",
                width: "100%",
                objectFit: "contain",
              }}
              preview={true}
              height="500px"
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default DetailsPost;
