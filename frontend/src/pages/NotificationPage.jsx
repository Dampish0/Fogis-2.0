import React from 'react'
import NavBar from '../components/navbar/Navbar'
import { Box, Button, Icon, IconButton, List, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PageFooter from '../components/PageFooter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import useAuthStore from '../store/authStore';

const NotificationPage = (props) => {
    const notifications = props.user.notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [filter, setFilter] = useState('all');
    const [_, forceUpdate] = useState(0);
    const { markNotificationsAsRead } = useAuthStore();

    const handleReadAll = () => {
        notifications.forEach(n => n.read = true);
        markNotificationsAsRead(notifications.map(n => n._id));
        forceUpdate(x => x + 1);
    }

    const handleNotificationClick = (notification) => {
        notification.read = true;
        markNotificationsAsRead([notification._id]); 
        setSelectedNotification(notification);
    }

    // lägg till senare.....
    const UnRead = () => {
        
    }

    const stylingForToggling = {
        '&.Mui-selected': {
                backgroundColor: "#64748b", 
                color: "white"
            },
            '&.Mui-selected:hover': {
                backgroundColor: "#64748b"
            }
    }

  return (
    <div>
        <NavBar/>
        <Typography variant="h4" sx={{color: "black", mt: 5, mb: 2, textAlign: "center" }}>Notifikationer</Typography>
        <Modal open={selectedNotification != null} onClose={() => setSelectedNotification(null)}
         sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box style={{boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)", backgroundColor: "rgba(0,0,0, 0.7)"
        , backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "14px", padding: "20px", color: "white",
            width: "clamp(300px, 90%, 600px)", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", outline: "none",
        minHeight: "600px"}}
             sx={{ p: 2 }}>
                <Typography style={{position:"absolute", top:"30px"}} variant="h4" fontWeight="bold" mb={2}>{selectedNotification?.title}</Typography>
                {selectedNotification && (
                    <Box>
                        <Typography variant="body1">{selectedNotification?.message}</Typography>

                    </Box>
                    
                )}
                <Typography variant="body2" style={{position:"absolute", bottom:"10px"}}>
                    {new Date(selectedNotification?.date).toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
                </Typography>
            </Box>
        </Modal>
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", mb: 5}}
        ><TableContainer style={{ 
            maxHeight: "clamp(300px, 200vh, 1600px)", width: "clamp(500px, 100%, 1200px)", backgroundColor: "#3c3c3cff", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.1)"}} component={Paper}>
            <Table sx={{ width: "clamp(500px, 100%, 1200px)" }} size="small">
                <TableHead style={{height:"55px"}}>
                <TableRow>

                    <TableCell colSpan={2} style={{ color: "white" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>




                            <ToggleButtonGroup exclusive value={filter}
                             style={{maxHeight: "38px", backgroundColor:"#323848ff", marginLeft: "-10px"}}>
                                <ToggleButton onClick={() => setFilter('all')} value="all" sx={{borderRadius: "15px", ...   stylingForToggling, color:"white", borderColor:"rgba(255, 255, 255, 0.5)"}}>Alla</ToggleButton>
                                <ToggleButton onClick={() => setFilter('unread')} value="unread" sx={{borderRadius: "15px", ...   stylingForToggling, color:"white", borderColor:"rgba(255, 255, 255, 0.5)"}}>Olästa</ToggleButton>
                                <ToggleButton onClick={() => setFilter('read')} value="read" sx={{borderRadius: "15px", ...   stylingForToggling, color:"white", borderColor:"rgba(255, 255, 255, 0.5)"}}>Lästa</ToggleButton>
                            </ToggleButtonGroup> 
                            
                            <Button color='primary' 
                                style={{marginRight:"-8px",  display: "flex", alignItems: "center", borderRadius:"9px", backgroundColor:"#075985"}} onClick={handleReadAll}>
                                <NotificationsIcon style={{color:"white"}}/>
                                <Typography  sx={{fontSize:"14px", color:"white"}}>Markera alla som lästa</Typography>
                            </Button>
                        
                        
                        
                        
                        
                        </Box>

                    </TableCell>
                    {/* <TableCell style={{ color: "white" }} align="right">match id</TableCell> */}
                    {/* <TableCell style={{ color: "white" }} align="right">Se detaljer</TableCell> */}
                </TableRow>

                </TableHead>
                <TableBody style={{backgroundColor: "#1d293d"}}> 
                    {notifications.filter(n => filter === 'all' || (filter === 'read' && n.read) || (filter === 'unread' && !n.read)).map((n, index) => (
                        <TableRow key={index} style={{backgroundColor:"#4b4b4bff"}}>
                            <TableCell  onClick={() => handleNotificationClick(n)}
                             style={{ color: "white", cursor: "pointer", borderBottom: (index == notifications.length - 1 ? "none" : null) }}
                             sx={{
                                "&:hover": {
                                    backgroundColor: "#64748b", 
                                    color: "#eab308",          
                                    },
                             }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    {!n.read && <Icon sx={{ mr: 1 }}><NotificationsIcon style={{color:"#eab308"}}/></Icon>}
                                    {n.message}
                                </Typography>
                                
                                <Typography sx={{fontSize:"12px", color:"white"}}>{new Date(n.date).toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}</Typography>
                                </Box>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        <PageFooter/>
    </div>
  )
}

export default NotificationPage