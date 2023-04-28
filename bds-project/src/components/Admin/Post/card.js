import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackgroundLetterAvatars from "../../Layout/Notification/BackgroundLetterAvatars";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const typoFlex = {
  display: "flex",
  justifyContent: "flex-start",
  textAlign: "left",
  fontSize: "14px",
};

function PostCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: "10px" }}>
      <CardHeader
        avatar={<BackgroundLetterAvatars name={item.postTitle} />}
        title={item.postTitle}
        subheader={item.detailsAddress}
        action={
          <Link to={`/post/edit/${item.postId}`}>
            <IconButton aria-label="settings">
              <FaRegEdit />
            </IconButton>
          </Link>
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" size="small">
          <FavoriteIcon sx={{ marginRight: "10px" }} />
          <Typography variant="body1" color="text.secondary">
            {item.totalLike}
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <MeetingRoomIcon sx={{ marginRight: "10px" }} />
          <Typography variant="body1" color="text.secondary">
            {item.numberOfRooms}
          </Typography>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "0 20px 10px",
          }}
        >
          <Grid item xs={12} md={3} sx={{ ...typoFlex }}>
            <CardMedia
              component="img"
              height="250"
              display="inline"
              style={{ objectFit: "contain" }}
              width="auto"
              image={item.imageUrls[0]}
              alt="this is a post image"
            />
          </Grid>
          <Grid item xs={12} md={9} sx={{ ...typoFlex }}>
            <CardContent>
              <Typography paragraph sx={{ ...typoFlex }} color="text.secondary">
                Address: {item.detailsAddress}
              </Typography>
              <Typography paragraph sx={{ ...typoFlex }} color="text.secondary">
                Price: {item.price}
              </Typography>
              <Typography paragraph sx={{ ...typoFlex }} color="text.secondary">
                Square Area: {item.squareArea}
              </Typography>
              <Typography paragraph sx={{ ...typoFlex }} color="text.secondary">
                Number Of Rooms: {item.numberOfRooms}
              </Typography>
              <Typography paragraph sx={{ ...typoFlex }} color="text.secondary">
                Description: {item.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
}

export default PostCard;
