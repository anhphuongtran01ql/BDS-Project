import { useLocation } from "react-router-dom";
import CarouselCard from "../../Layout/CarouselCard";
import { Box, Grid, Typography } from "@mui/material";
import { useGetUserInfo } from "../../Auth/Authorization/getUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLikesByUserId } from "../../../Services/User/UserServices";
import { createNewLike, likePost } from "../../../Services/Post/PostServices";

function FilterPost() {
  const { state } = useLocation();
  console.log("state", state);

  const userInfo = useGetUserInfo();

  const { mutate } = useMutation(likePost);
  const { mutate: createLike } = useMutation(createNewLike);
  const { data: likes, status: likesStatus } = useQuery({
    queryKey: ["likes-by-user-id", userInfo ? userInfo.userId : null],
    queryFn: () => getLikesByUserId(userInfo ? userInfo.userId : null),
  });

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
    <Box sx={{ mx: 2, my: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {state?.length > 0 ? (
          likesStatus === "success" && (
            <>
              {state.map((post, index) => {
                post.imageUrls = [
                  "https://s3.ap-southeast-1.amazonaws.com/bds-rent/1682991323396-house-1867187_640.jpg",
                  "https://s3.ap-southeast-1.amazonaws.com/bds-rent/1682991323848-house-1836070__340.jpg",
                ];
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
            </>
          )
        ) : (
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", height: "45vh" }}
          >
            <Typography>Have no result!</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default FilterPost;
