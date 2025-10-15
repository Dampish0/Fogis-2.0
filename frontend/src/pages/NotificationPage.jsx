import React from 'react'
import NavBar from '../components/navbar/Navbar'
import { List, ListItem, Typography } from '@mui/material';
import PageFooter from '../components/PageFooter';

const NotificationPage = (props) => {
    const notifications = props.user.notifications;
  return (
    <div> 
        <Typography variant="h4" sx={{color: "black", mt: 5, mb: 2, textAlign: "center"}}>Notifikationer</Typography>
        <List sx={{ width: '80%', margin: '0 auto', color: "black"  }}> 
          {notifications.map((notification, index) => (
            <ListItem key={index}>{notification.message}</ListItem>
          ))}
        </List>
        <PageFooter/>
    </div>
  )
}

export default NotificationPage