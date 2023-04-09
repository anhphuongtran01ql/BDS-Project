import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";

import { fetchAllPosts } from "../../Services/Post/PostServices";
import { useQuery } from "@tanstack/react-query";

const LocationCards = () => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchAllPosts(),
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <Box sx={{ mx: 2 }}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {data?.length > 0 &&
              data.map((post) => {
                return (
                  <>
                    <Grid key={post.postId} item xs={12} sm={6} md={4} lg={3}>
                      <CarouselCard post={post} />
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default LocationCards;
