import "../index.css";
import React, { forwardRef } from "react";
import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ImageComponent = forwardRef(
  ({
    image,
    style,
    ref,
    onPreviewClick,
    preview = false,
    height = "auto",
  }) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.up("sm"));

    return (
      <img
        ref={ref}
        src={image}
        srcSet={image}
        alt="image"
        height={preview ? height : matchesXs ? height : 200}
        loading="lazy"
        width={245}
        style={{ ...style }}
        onClick={() => (preview ? 0 : onPreviewClick(image))}
      />
    );
  }
);

export default ImageComponent;
