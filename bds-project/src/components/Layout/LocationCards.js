import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import UsePagination from "./Pagination";
import { useGetUserInfo } from "../Auth/Authorization/getUserInfo";
import { getLikesByUserId } from "../../Services/User/UserServices";

import {
  fetchAllPosts,
  likePost,
  createNewLike,
} from "../../Services/Post/PostServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Pagination, Typography } from "@mui/material";
import Loading from "./Loading";

const LocationCards = () => {
  let [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [postData, setPostData] = useState([]);
  const { mutate } = useMutation(likePost);
  const { mutate: createLike } = useMutation(createNewLike);

  const PER_PAGE = 15;

  let paramQuery = {
    page: page,
    pageSize: PER_PAGE,
  };

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchAllPosts(paramQuery),
  });

  const userInfo = useGetUserInfo();
  const { data: likes, status: likesStatus } = useQuery({
    queryKey: ["likes-by-user-id", userInfo ? userInfo.userId : null],
    queryFn: () => getLikesByUserId(userInfo ? userInfo.userId : null),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setPageCount(Math.ceil(data.length / PER_PAGE));
      setPostData(data);
    }
  }, [data]);

  const _DATA = UsePagination(postData, PER_PAGE);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>Error</>;
  }

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
          {data?.length >= PER_PAGE && (
            <Pagination
              sx={{ display: "flex", justifyContent: "flex-end" }}
              count={pageCount}
              size="large"
              page={page}
              variant="outlined"
              color="secondary"
              onChange={handleChange}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default LocationCards;
