import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  fetchCommentByPostId,
} from "../../../Services/Post/PostServices";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentEditComponent from "./CommentEditComponent";
import { GetCurrentId } from "../../Auth/Authorization/getUserInfo";

const ReviewsComponent = ({setTotalReview}) => {
  const { mutate } = useMutation(createComment);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const userId = GetCurrentId();
  
  const [comment, setComment] = useState("");
  const {
    data: comments,
    isCommentsLoading,
    isCommentsFetching,
  } = useQuery({
    queryKey: ["commentsByPostId", postId],
    queryFn: () => fetchCommentByPostId(postId),
  });

  setTotalReview(comments ? comments.length : 0);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      mutate(
        { comment: comment, userId: userId, postId: postId },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["commentsByPostId"] });
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      setComment("");
    }
    if (e.key === "Escape") {
      setComment("");
    }
  };

  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        // multiline
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        placeholder="write an review..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        onKeyDown={onEnter}
      />

      {isCommentsLoading || isCommentsFetching ? (
        <>Loading</>
      ) : (
        <>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {comments &&
              comments.map((user, index) => (
                <div key={index} style={{ margin: "30px 0" }}>
                  <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ marginRight: 0 }}>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${user.userId}` ?? "username"} />
                  </ListItem>
                  <CommentEditComponent
                    commentValue={user.comment}
                    commentId={user.commentPostId}
                    userId={userId}
                    commentUserId={user.userId}
                    postId={user.postId}
                  />
                </div>
              ))}
          </List>
          {/* <Button variant="outlined">Show all comments</Button> */}
        </>
      )}
    </>
  );
};

export default ReviewsComponent;
