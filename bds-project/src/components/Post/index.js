import React, {useMemo, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../Services/Post/PostServices";
import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { justifyCenter } from "../../themes/commonStyles";
import { Divider } from "@mui/material";
import {itemData} from "../../data/postData";
import ShowAllImage from "./Detail/ShowAllImage";

import AppsIcon from '@mui/icons-material/Apps';

function DetailsPost() {
    const {postId} = useParams();
    const [showAll, setShowAll] = useState(false);

    const {data, isLoading, isFetching} = useQuery({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId),
    });
    const handleClickShowAll = () => {
        setShowAll(!showAll)
    }
  return (
    <>
      {/*{isLoading || isFetching ? (*/}
      {/*  <>Loading</>*/}
      {/*) : (*/}
      {/*  <>*/}
          <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ ...justifyCenter }} style={{ paddingTop:"90px"}} >
              <Grid item xs={6} >
                <img
                    src={itemData[0].img}
                    srcSet={itemData[0].img}
                    alt={itemData[0].title}
                    height={500}
                    loading="lazy"
                    style={{
                      borderRadius:4,
                      display: "block",
                      width: "100%",
                    }}
                />
              </Grid>

              <Grid item xs={6} >
                <ImageList sx={{width: 500, height: 500, overflowY: "unset", marginTop: 0}} cols={2} gap={10}>
                  {itemData.map((item, index) => {
                    if (index !== 0 && index < 5) {
                      return (<ImageListItem key={index}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            style={{
                                borderRadius:4,
                            }}
                            loading="lazy"
                        />
                      </ImageListItem>)
                    }
                  })}
                </ImageList>
              </Grid>
            </Grid>
              <Button variant="outlined" onClick={handleClickShowAll}><AppsIcon fontVariant="outlined" style={{ ...justifyCenter, marginRight:5}} />Show all photos</Button>

              {/*<Grid item xs={12}>*/}
              {/*    {data.postTitle}*/}
              {/*</Grid>*/}
            <Divider />
          </Container>
        <Modal
            open={showAll}
            onClose={()=> setShowAll(false)}
            slotProps={{backdrop: {
                style: {backgroundColor: 'white'}}
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                overflowY:"auto",
                display:"flex",
                width:"60%",
                margin:"90px auto"
            }}
        >
            <ShowAllImage itemData={itemData} ref={useRef()} />
        </Modal>
        {/*</>*/}
      {/*)}*/}
    </>
  );
}

export default DetailsPost;
