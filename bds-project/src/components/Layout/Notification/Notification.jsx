import NotificationsIcon from "@mui/icons-material/Notifications";
import {Badge, Divider, Menu} from "@mui/material";
import Fade from "@mui/material/Fade";
import React, {useEffect, useState} from "react";
import NotificationComment from "./NotificationComment";
import {useNavigate} from "react-router";
import useFetchNotifications from "../../../CustomHook/useFetchNotifications";
import Typography from "@mui/material/Typography";
import './notification.css'

const Notification = () => {
    const [count, setCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const userId = 2; // change to getUserId
    const {
        notifications,
        total,
        loading,
        error,
        invalidateQuery,
        handleClickOpenNotification
    } = useFetchNotifications(userId);

    const handleClick = (e) => {
        setCount(0);
        handleClickOpenNotification();
        setAnchorEl(e.currentTarget);
    }

    const handleDetailClick = (notificationData) => {
        invalidateQuery();
        setAnchorEl(null);
        navigate(`/post/${notificationData.postId}`);
    }

    useEffect(() => {
        if (loading === false) {
            setCount(total);
        }
    }, [loading, notifications])

    const handleClose = () => {
        setAnchorEl(null);
        handleClickOpenNotification();
    };
    return (
        <Badge color='secondary' badgeContent={count}>
            <NotificationsIcon onClick={handleClick}/>
            <Menu
                id='fade-menu'
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                sx={{borderRadius: '50px', padding: 0}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                TransitionComponent={Fade}
            >
                {/*handle case no notifications new*/}
                <Typography variant='h5' sx={{paddingLeft: '16px'}} gutterBottom>Notifications</Typography>
                <Divider sx={{margin: '0 16px'}}/>
                    <div className="scrollbar" id="style-1" style={{ minHeight: notifications.length > 0 ? 'auto' : '30vh'}}>
                            {
                                notifications.length > 0 ?

                                    notifications.map((item, index) =>
                                        <NotificationComment item={item} key={index}
                                                             handleDetailClick={handleDetailClick}
                                                             userId={userId}/>
                                    ) :
                                    <Typography variant='h6' sx={{
                                        paddingLeft: '16px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '200px',
                                        opacity: '0.6',
                                        alignItems: 'center'
                                    }} gutterBottom>{error !== '' ? error : 'You have no Notification'}</Typography>
                            }
                    </div>
            </Menu>
        </Badge>
    )
}

export default Notification;