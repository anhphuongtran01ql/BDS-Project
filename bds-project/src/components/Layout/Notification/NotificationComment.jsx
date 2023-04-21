import Grid from "@mui/material/Grid";
import BackgroundLetterAvatars from "./BackgroundLetterAvatars";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateNotification} from "../../../Services/Notification/NotificationServices";

const NotificationComment = ({item, handleDetailClick, userId}) => {
    const [isRead, setIsRead] = useState(false)
    const {mutate} = useMutation(updateNotification);

    const handleClick = () => {
        setIsRead(true)
        mutate({notificationId: item.notificationId, read: true, receiverId: userId}, {
            onSuccess: (data) => {
                handleDetailClick(item)
                console.log('success')
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    return (
        <MenuItem style={{whiteSpace: 'normal', minHeight: '70px', width:'340px'}} onClick={handleClick}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <BackgroundLetterAvatars name={item.notificationContent.split('has comment on your post')[0]}/>
                </Grid>
                <Grid item xs={9}>
                    {item.notificationContent}
                </Grid>
                <Grid item xs={1} style={{display: 'flex', alignItems: 'center'}}>
                    {!isRead && !item.read &&
                        <FiberManualRecordIcon style={{fontSize: '12px', color: 'hsl(214, 100%, 59%)'}}/>}
                </Grid>
            </Grid>
        </MenuItem>
    )
}

export default NotificationComment