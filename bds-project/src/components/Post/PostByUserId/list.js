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
import PostCard from "../../Admin/Post/card";

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
                return <PostCard item={item} key={index} />;
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
