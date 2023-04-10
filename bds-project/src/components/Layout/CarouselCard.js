import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// 3rd party
import SwipeableViews from "react-swipeable-views";

// react icons
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../../themes/commonStyles";
import "./CarouselCard.css";
import NoImageAvailable from "../../assets/No_Image_Available.jpg";

const CarouselCard = ({ post }) => {
  // console.log("post", post);
  const [activeStep, setActiveStep] = React.useState(0);

  // const maxSteps = post.imageUrl.length;
  // so that we know how many dots

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };
  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box sx={fixedIcon}>
        <FaRegHeart size={24} color="#fff" />
      </Box>

      {post.imageUrl && post.imageUrl.length ? (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {post.imageUrl && (
            // post.imageUrl.map((step) => {
            //   console.log("Step", step);
            //   return (
            //     <div>
            //       <Box component="img" sx={carouselImage} src={step}></Box>
            //     </div>
            //   );
            // })
            <Box component="img" sx={carouselImage} src={post.imageUrl}></Box>
          )}
        </SwipeableViews>
      ) : (
        <>
          <Box component="img" sx={carouselImage} src={NoImageAvailable}></Box>
        </>
      )}

      {/* <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: "transparent" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box> */}

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography
            component="div"
            align="left"
            sx={{ fontSize: 20, fontWeight: "bold", padding: "0 8px" }}
          >
            {post.postTitle}
          </Typography>
          <Typography
            component="div"
            align="left"
            sx={{ fontSize: 18, fontWeight: 400, padding: "0 8px" }}
          >
            <span>
              <i>{post.detailsAddress} </i>
            </span>
            <span> | </span>
            <span> {post.typeOfApartment}</span>
          </Typography>

          <Typography
            component="h5"
            align="left"
            sx={{ fontSize: 18, fontWeight: 400, padding: "0 8px" }}
          >
            <strong>${post.price}</strong>/night
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ ...dFlex, alignItems: "center" }}>
            <AiFillHeart size={16} color="red" />
            <Typography component="h5"> {post.totalLike}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselCard;
