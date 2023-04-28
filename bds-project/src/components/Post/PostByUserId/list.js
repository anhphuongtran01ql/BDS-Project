import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  fetchAllPostsByUserId,
  getTotalPost,
} from "../../../Services/Post/PostServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Layout/Loading";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackgroundLetterAvatars from "../../Layout/Notification/BackgroundLetterAvatars";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Nodata from "../../Layout/Noda";
import { useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const typoFlex = {
  display: "flex",
  justifyContent: "flex-start",
  textAlign: "left",
  fontSize: "14px",
};

function ListPostByUserId() {
  const { userId } = useGetUserInfo();
  const PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  let paramQuery = {
    page: currentPage,
    pageSize: PER_PAGE,
  };

  //   const { data: totalData } = useQuery({
  //     queryKey: ["total"],
  //     queryFn: () => getTotalPost(),
  //   });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts", paramQuery, userId],
    queryFn: () => fetchAllPostsByUserId(paramQuery, userId),
  });

  //   let countPage = Math.ceil(totalData / PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    queryClient.invalidateQueries({ queryKey: ["posts", paramQuery] });
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Box sx={{ margin: "20px" }}>
          {data?.length > 0 ? (
            <>
              {data?.map((item, index) => {
                return (
                  <Card
                    sx={{
                      margin: "10px",
                      padding: "20px",
                      boxShadow: 3,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#101010" : "#fff",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                      p: 1,
                      m: 1,
                      borderRadius: 2,
                      textAlign: "center",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                    }}
                  >
                    <CardHeader
                      avatar={<BackgroundLetterAvatars name={item.postTitle} />}
                      title={item.postTitle}
                      subheader={item.detailsAddress}
                      action={
                        <Link to={`/post/edit/${item.postId}`}>
                          <IconButton aria-label="settings">
                            <FaRegEdit />
                          </IconButton>
                        </Link>
                      }
                    />

                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" size="small">
                        <FavoriteIcon sx={{ marginRight: "10px" }} />
                        <Typography variant="body1" color="text.secondary">
                          {item.totalLike}
                        </Typography>
                      </IconButton>
                      <IconButton aria-label="share">
                        <MeetingRoomIcon sx={{ marginRight: "10px" }} />
                        <Typography variant="body1" color="text.secondary">
                          {item.numberOfRooms}
                        </Typography>
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          padding: "0 20px 10px",
                        }}
                      >
                        <Grid item xs={12} md={3} sx={{ ...typoFlex }}>
                          <CardMedia
                            component="img"
                            height="250"
                            display="inline"
                            style={{ objectFit: "contain" }}
                            width="auto"
                            image={item.imageUrls[0]}
                            alt="this is a post image"
                          />
                        </Grid>
                        <Grid item xs={12} md={9} sx={{ ...typoFlex }}>
                          <CardContent>
                            <Typography
                              paragraph
                              sx={{ ...typoFlex }}
                              color="text.secondary"
                            >
                              Address: {item.detailsAddress}
                            </Typography>
                            <Typography
                              paragraph
                              sx={{ ...typoFlex }}
                              color="text.secondary"
                            >
                              Price: {item.price}
                            </Typography>
                            <Typography
                              paragraph
                              sx={{ ...typoFlex }}
                              color="text.secondary"
                            >
                              Square Area: {item.squareArea}
                            </Typography>
                            <Typography
                              paragraph
                              sx={{ ...typoFlex }}
                              color="text.secondary"
                            >
                              Number Of Rooms: {item.numberOfRooms}
                            </Typography>
                            <Typography
                              paragraph
                              sx={{ ...typoFlex }}
                              color="text.secondary"
                            >
                              Description: {item.description}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Card>
                );
              })}
              {/* {totalData >= PER_PAGE && (
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                  size="small"
                  color="primary"
                  count={2}
                  page={currentPage}
                  onChange={handleChange}
                />
              )} */}
            </>
          ) : (
            <Nodata />
          )}
        </Box>
      )}
    </>
  );
}

export default ListPostByUserId;
