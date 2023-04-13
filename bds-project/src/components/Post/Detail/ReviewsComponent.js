import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const COMMENT_DATA_MOCKUP = [
    {
        name: 'Quang',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2014',
        userId: 1
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
        userId: 2
    },
    {
        name: 'Ngoc',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2022',
        userId: 3
    },
    {
        name: 'Suong',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2021',
        userId: 4
    },
    {
        name: 'Khanh',
        comment: 'It was absolutely fantastic experience! The villa is stunning! The infinity pool, the garden, the service and the meals are awesome. Very clean space! We did not want to go back home))',
        date: 'Jan 9, 2020',
        userId: 5
    },

]

const ReviewsComponent = ({comments = COMMENT_DATA_MOCKUP}) => {
    return (
        <>
            <TextField
                id='outlined-multiline-static'
                label='Comment'
                multiline
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                placeholder='write an review...'
                defaultValue=''
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
                        <div className='comments'>{user.comment}</div>
                    </div>
                ))
                }
            </List>
            <Button variant='outlined'>Show all comments</Button>
        </>

    )
}

export default ReviewsComponent;