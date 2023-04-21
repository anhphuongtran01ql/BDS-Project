import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import UsePagination from "./Pagination";
import { GetCurrentId } from "../Auth/Authorization/getUserInfo";
import {getLikesByUserId} from "../../Services/User/UserServices";

import { fetchAllPosts, likePost, createNewLike } from "../../Services/Post/PostServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Pagination } from "@mui/material";

const LocationCards = () => {
  let [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [postData, setPostData] = useState([]);
  const { mutate } = useMutation(likePost);
  const { mutate:createLike} = useMutation(createNewLike);

  const PER_PAGE = 24;

  let paramQuery = {
    page: page,
    pageSize: PER_PAGE,
  };

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchAllPosts(paramQuery),
  });

  const userId = GetCurrentId();

  const { data:likes, status:likesStatus } = useQuery({
    queryKey: ["likes-by-user-id", userId],
    queryFn: () => getLikesByUserId(userId),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setPageCount(Math.ceil(data.length / PER_PAGE));
      setPostData(data);
    }
  }, [data]);

  const _DATA = UsePagination(postData, PER_PAGE);

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const findIsLike = post => {
    const like = likes?.find((like) => like.postId === post.postId && like.userId === userId);
    return like ??  {like:false}
  }

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <Box sx={{ mx: 2 }}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {data?.length > 0 && likesStatus==='success' && 
              data.map((post, index) => {
                return (
                  <>
                    <Grid key={post.postId} item xs={12} sm={6} md={4} lg={3}>
                      <CarouselCard post={post} like={findIsLike(post)} userId={userId} mutate={mutate} createNewLike={createLike} key={index}/>
                    </Grid>
                  </>
                );
              })}
          </Grid>
          <Pagination
            sx={{ display: "flex", justifyContent: "flex-end" }}
            count={pageCount}
            size="large"
            page={page}
            variant="outlined"
            color="secondary"
            onChange={handleChange}
          />
        </Box>
      )}
    </>
  );
};

export default LocationCards;
