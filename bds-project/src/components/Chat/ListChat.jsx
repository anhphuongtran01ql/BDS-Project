import './Messenger.css';

import * as React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import UserInbox from "./UserInbox";

const ListChat = ({}) => {
    const LIST_USER = [
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 1,
        },
        {
            userName: 'Phuong Tran',
            message: ' — I\'ll be in your neighborhood doing errands this…',
            userId: 2
        },
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 3,
        },
        {
            userName: 'Phuong Tran',
            message: ' — I\'ll be in your neighborhood doing errands this…',
            userId: 4
        },
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 5,
        },
        {
            userName: 'Phuong Tran',
            message: ' — I\'ll be in your neighborhood doing errands this…',
            userId: 6
        },
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 7,
        },
        {
            userName: 'Phuong Tran',
            message: ' — I\'ll be in your neighborhood doing errands this…',
            userId: 8
        },
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 9,
        },
        {
            userName: 'Phuong Tran',
            message: ' — I\'ll be in your neighborhood doing errands this…',
            userId: 10
        },
        {
            userName: 'Quang Nguyen',
            message: 'I\'ll be in your neighborhood doing errands thi',
            userId: 11,
        },
    ]

    return (
        <div className="list-chat">
            <Typography variant='h5' sx={{paddingTop: '3px', height: '5%'}}>Chat</Typography>
            <List sx={{
                width: 'auto',
                height: '95%',
                overflow: 'auto',
                maxWidth: 360,
                paddingTop: 0,
                borderTop: '1px solid #ccc'
            }}>
                {LIST_USER.map((user, index) => <UserInbox key={index} indexValue={index} user={user}/>)}
            </List>
        </div>)
}

export default ListChat;