import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createComment, fetchCommentByPostId} from "../../../Services/Post/PostServices";
import {useParams} from "react-router-dom";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import CommentEditComponent from "./CommentEditComponent";

const COMMENT_DATA_MOCKUP = [
    {
        name: 'Quang',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2014',
        userId: 1,
        commentId: 1
    },
    {
        name: 'Phuong',
        comment: 'THE REEF. enough said. This place is right on the beach and it was so convenient to be able to go snorkelling any time we wanted. We saw two sea turtles in our own backyard! You can even rent underwater torches for a spooky late night adventure.\n' +
            '\n' +
            'Anything this place lacks makes up for with that reef and the gorgeous property itself.\n' +
            '\n' +
            'The meals seemed off in terms of quality of the meat/food. That would have been the most disappointing part but certainly not a deal breaker.\n' +
            '\n' +
            'The staff is responsive & kind. A lady named pushpa checked us out and was so sweet! The massage was amazing as well.\n' +
            '\n' +
            'This place is a hidden gem & I will be recommending it to all my loved ones.',
        date: 'Jan 9, 2023',
        userId: 2,
        commentId: 2
    },
    {
        name: 'Ngoc',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2022',
        userId: 3,
        commentId: 3
    },
    {
        name: 'Suong',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2021',
        userId: 4,
        commentId: 4
    },
    {
        name: 'Khanh',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2020',
        userId: 5,
        commentId: 5
    },

]

const ReviewsComponent = ({commentsData = COMMENT_DATA_MOCKUP}) => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const {mutate} = useMutation(createComment);
    const {postId} = useParams();
    const queryClient = useQueryClient();

    const [comments, setComments] = useState(commentsData);
    const [comment, setComment] = useState('')
    // const { data:comments, isCommentsLoading, isCommentsFetching } = useQuery({
    //     queryKey: ["commentsByPostId", postId],
    //     queryFn: () => fetchCommentByPostId(postId),
    // });

    const setListCommentsAfterEdit = (commentData, commentId) => {
        const commentIndex = comments.findIndex((item, index) => item.commentId === commentId);
        comments[commentIndex].comment = commentData
        setComments(comments)
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            //fix api create comment here
            // mutate({comment: e.target.value, userId: user.id, postId: postId },{
            //     onSuccess: (data) => {
            //         queryClient.invalidateQueries({ queryKey: ["commentsByPostId"] });
            //         console.log('success')
            //     },
            //     onError: (error) => {
            //        console.log(error)
            //     },
            // })
            setComments([...comments, {
                name: user.name ?? 'quang',
                comment: e.target.value,
                date: Date.now(),
                userId: user.id ?? 10
            }])
            setComment('')
        }
    }

    return (
        <>
            <TextField
                id='outlined-multiline-static'
                label='Comment'
                // multiline
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                placeholder='write an review...'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                onKeyDown={onEnter}
            />

            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {comments.map((user, index) => (
                    <div key={index}>
                        <ListItem sx={{paddingLeft: 0}}>
                            <ListItemAvatar>
                                <Avatar sx={{marginRight: 0}}>
                                    <AccountCircleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} secondary={user.date}/>
                        </ListItem>
                        <CommentEditComponent commentValue={user.comment} commentId={user.commentId}
                                              updateCommentAfterEdit={setListCommentsAfterEdit}/>
                    </div>
                ))
                }
            </List>
            <Button variant='outlined'>Show all comments</Button>
        </>

    )
}

export default ReviewsComponent;