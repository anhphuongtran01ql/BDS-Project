import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ReserveCard = ({data}) => {
    return (
        <Card className="reserve-card" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h4"
                            >{data.price}đ / month</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='primary' sx={{width:'100%', background:'#FF385C', color:'white', fontSize:15, fontWeight:'bold', textTransform:'none'}} >Reserve</Button>
            </CardActions>
        </Card>
    );
}

export default ReserveCard;