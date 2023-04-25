import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import { useGetUserInfo } from "../Auth/Authorization/getUserInfo";
import { getLikesByUserId } from "../../Services/User/UserServices";

import {
  fetchAllPosts,
  likePost,
  createNewLike,
  getTotalPost,
} from "../../Services/Post/PostServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pagination, Typography } from "@mui/material";
import Loading from "./Loading";

const LocationCards = () => {
  const PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate } = useMutation(likePost);
  const { mutate: createLike } = useMutation(createNewLike);

  const queryClient = useQueryClient();

  let paramQuery = {
    page: currentPage,
    pageSize: PER_PAGE,
  };

  const { data: totalData } = useQuery({
    queryKey: ["total"],
    queryFn: () => getTotalPost(),
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts", paramQuery],
    queryFn: () => fetchAllPosts(paramQuery),
  });

  const userInfo = useGetUserInfo();
  const { data: likes, status: likesStatus } = useQuery({
    queryKey: ["likes-by-user-id", userInfo ? userInfo.userId : null],
    queryFn: () => getLikesByUserId(userInfo ? userInfo.userId : null),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>Error</>;
  }

  let countPage = Math.ceil(totalData / PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    queryClient.invalidateQueries({ queryKey: ["posts", paramQuery] });
  };

  const findIsLike = (post) => {
    const falseObject = { like: false };
    if (userInfo === null) {
      return falseObject;
    }

    const like = likes?.find(
      (like) => like.postId === post.postId && like.userId === userInfo.userId
    );
    return like ?? falseObject;
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <Box sx={{ mx: 2, my: 2 }}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {data?.length > 0 &&
              likesStatus === "success" &&
              data.map((post, index) => {
                return (
                  <Grid
                    key={`carousel-${index}`}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <CarouselCard
                      post={post}
                      like={findIsLike(post)}
                      userId={userInfo ? userInfo.userId : null}
                      mutate={mutate}
                      createNewLike={createLike}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {totalData >= PER_PAGE && (
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
              size="large"
              color="primary"
              count={countPage}
              page={currentPage}
              onChange={handleChange}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default LocationCards;
