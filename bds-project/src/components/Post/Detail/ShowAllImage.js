import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import {justifyCenter} from "../../../themes/commonStyles";
import React, {forwardRef} from "react";
import {Skeleton} from "@mui/lab";

const ShowAllImage = forwardRef(({itemData, ref}) => {
    return (
        <Grid container spacing={2} ref={ref} sx={{...justifyCenter}}>
            <Masonry columns={3} spacing={4}>
                {itemData.map((item, index) => (
                    <div key={index}>
                        {item ?
                            (<img
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
                            />)
                            :
                            <Skeleton variant="rounded" width={210} height={60}/>
                        }
                    </div>
                ))}
            </Masonry>
        </Grid>
    )
})

export default ShowAllImage;