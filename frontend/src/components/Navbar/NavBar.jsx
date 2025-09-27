import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SettingIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import eif from '../../assets/hff.png';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavBar = (props) => {


  return (<>
    <div style={{
      ...props.style,
      position: "absolute",
      overflow: "hidden",
      background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)", 
      WebkitBackdropFilter: "blur(12px)",
      height: "60px",
      maxWidth: "100vw",
      borderRadius: "20px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
      //margin: "16px",
      left: "16px",
      right: "16px",
      top: "16px",
      marginBottom: "16px",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", flexDirection: "row" }}>
        <Typography style={{marginLeft: "10px", letterSpacing: "4px"}} variant="h5" component="div" sx={{ color: "white", padding: "16px" }}>
          FAIS
        </Typography>
        <Button sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Hem
        </Button>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button sx={{fontSize: "16px", marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Matcher
        </Button>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Tävlingar
        </Button>

        {/* mitten */}


        {/* HÖGRA SIDAN */}
        <IconButton size="large"
         sx={{alignSelf: "right", color: "white", marginLeft: "auto" }}>
          <NotificationsIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button style={{color: "white", marginRight: "10px"}}>
          <KeyboardArrowDownIcon sx={{ color: "white" }}/>

          <Typography 
          variant="h6" component="div" sx={{ color: "white", padding: "16px 2px 16px 2px"  }}
          >
            Huskvarna IF
          </Typography>
          <Avatar src={eif} sx={{ width: 32, height: 32, marginLeft: "8px" }}>
          
          </Avatar>
        </Button>
      </div>
    </div>
    <div style={{height: "92px"}}></div>
    </>
  );

}

export default NavBar