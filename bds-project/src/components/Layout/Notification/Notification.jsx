import NotificationsIcon from "@mui/icons-material/Notifications";
import {Badge, Menu} from "@mui/material";
import Fade from "@mui/material/Fade";
import React, {useState} from "react";
import NotificationComment from "./NotificationComment";
import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchNotifications} from "../../../Services/Notification/NotificationServices";

const Notification = () => {
    const [count, setCount] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const userId = 2; // change to getUserId
    // const {data: notifications, isLoading, isFetching} = useQuery({
    //     queryKey: ["notifications", userId],
    //     queryFn: () => fetchNotifications(userId),
    // });

    const NOTIFICATIONLIST = [
        {
            postId: 8,
            notificationId: 1,
            notificationContent: 'Quang Nguyen has comment on your post Cho Thue Nha Quan Go Vap',
            senderId: 2,
            isRead: false,
        },
        {
            postId: 9,
            notificationId: 2,
            notificationContent: 'Phương Trần has comment on your post Cho Thue Nha Quan Go Vap',
            senderId: 3,
            isRead: false,
        }
    ]

    const [notifications, setNotifications] = useState(NOTIFICATIONLIST);


    const handleClick = (e) => {
        setCount(0);
        setAnchorEl(e.currentTarget);
    }

    const handleDetailClick = (notificationData) => {
        const indexNotification = notifications.findIndex((item) => item.notificationId === notificationData.notificationId)
        notifications[indexNotification].isRead = true;
        setNotifications(notifications)
        setAnchorEl(null);
        navigate(`/post/${notificationData.postId}`)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Badge color="secondary" badgeContent={count}>
            <NotificationsIcon onClick={handleClick}/>
            <Menu
                id='fade-menu'
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                sx={{borderRadius: '50px'}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <div style={{maxWidth: '350px'}}>
                    {
                        notifications.map((item, index) =>
                            <NotificationComment item={item} key={index} handleDetailClick={handleDetailClick} userId = {userId}/>
                        )
                    }
                </div>
            </Menu>
        </Badge>
    )
}

export default Notification;