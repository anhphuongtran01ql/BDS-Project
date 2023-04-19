import '../index.css';
import React, {forwardRef} from "react";
import {useTheme} from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const ImageComponent = forwardRef(({image, style, ref, customFilterImage = '', onPreviewClick, preview = false, height= 'auto'}) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.up('sm'));
    const imageSrcFilter = customFilterImage !== '' ? `${image.img}${customFilterImage}` : image.img
    return (
        <img
            ref={ref}
            src={imageSrcFilter}
            srcSet={imageSrcFilter}
            alt={image.title}
            height={preview ? height : (matchesXs ? height : 200 )}
            loading='lazy'
            style={{...style}}
            onClick={() => preview ? 0 : onPreviewClick(image)}
        />
    )
})

export default ImageComponent;