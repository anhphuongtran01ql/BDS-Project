import Grid from "@mui/material/Grid";
import { justifyCenter } from "../../../themes/commonStyles";
import React, { forwardRef } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ShowAllImage = forwardRef(({ itemData, ref }) => {
  return (
    <Grid container spacing={2} ref={ref} sx={{ ...justifyCenter }}>
      <ImageList sx={{ width: '80%', height: 'auto' }} cols={3} rowHeight={164}>
        {itemData.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={item}
              srcSet={item}
              alt={`image-${item}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
});

export default ShowAllImage;
