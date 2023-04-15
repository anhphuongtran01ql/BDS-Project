import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createComment, editComment} from "../../../Services/Post/PostServices";

const CommentEditComponent = ({commentValue, commentId, userId, commentUserId}) => {
    const [edit, setEdit] = useState(false);
    const [oldComment, setOldComment] = useState(commentValue)
    const [comment, setComment] = useState(commentValue)

    const {mutate} = useMutation(editComment);
    const queryClient = useQueryClient();
    const onEnter = (e) => {
        if (e.keyCode === 13) {
            //fix api edit comment here
            // mutate({comment: e.target.value, userId: user.id, commentId: commentId },{
            //     onSuccess: (data) => {
            //         queryClient.invalidateQueries({ queryKey: ["commentsByPostId"] });
            //         console.log('success')
            //     },
            //     onError: (error) => {
            //        console.log(error)
            //     },
            // })
           
            setEdit(false)
        }
        if (e.key === 'Escape') {
            setEdit(false)
            setComment(oldComment)
        }
    }

    return (
        <>
            {
                edit ?
                    <TextField
                        id='outlined-multiline-static'
                        label='Comment'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        placeholder='write an review...'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        onKeyDown={onEnter}
                    /> :
                    <div className="comments">
                        <div className='content'>{comment}</div>
                        {/* if want to more condition to show edit button, please add more conditions here */}
                        { userId === commentUserId && <EditIcon fontSize='small' onClick={() => setEdit(true)}/>}
                    </div>
            }
        </>
    )
}

export default CommentEditComponent;