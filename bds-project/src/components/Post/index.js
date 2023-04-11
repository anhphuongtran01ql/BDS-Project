import React from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../Services/Post/PostServices";
import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import { justifyCenter } from "../../themes/commonStyles";
import { Divider } from "@mui/material";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
];

function DetailsPost() {
  const { postId } = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  console.log("data", data);

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading</>
      ) : (
        <>
          <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ ...justifyCenter }}>
              <Masonry columns={3} spacing={4}>
                {itemData.map((item, index) => (
                  <div key={index}>
                    <img
                      src={`${item.img}`}
                      srcSet={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        display: "block",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}
              </Masonry>
            </Grid>

            <Grid item xs={12}>
              {data.postTitle}
            </Grid>
            <Divider />
          </Container>
        </>
      )}
    </>
  );
}

export default DetailsPost;
