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
import { NavLink, useNavigate } from 'react-router';
import useAuthStore from '../../store/authStore';
import Badge from '@mui/material/Badge';



const setMUI = (color) => (
    {
                    '& label.Mui-focused': {
                    color: color,
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: color,
                    },
                    '& .MuiInputLabel-root': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-input': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '34px', 
                    '& fieldset': {
                        borderColor: color,
                    },
                    '&:hover fieldset': {
                        borderColor: color,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: color,
                    },
                    },
             }
  );

const NavBar = (props) => {
    const {isAuthenticated, logout, user} = useAuthStore();
  const notificationCount = user?.notifications?.filter(n => !n.read).length;

  const navigate = useNavigate();

  const [ShowDropDownProfile, setShowDropDownProfile] = React.useState(false);
  const [ShowDropDownNotifications, setShowDropDownNotifications] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const homeClick = () => {
    navigate('/');
  }

  const matcherClick = () => {
    navigate('/matcher');
  }

  const competitionsClick = () => {
    navigate('/tavlingar');
  }

  const logoClick = () => {
    navigate('/');
  }

  const notificationsClick = () => {
    //dropdown meny
    // temporärt utan dropdown, istället en hel sida, orkar inte fixa detta nu
    navigate('/notifications');
  }

  const profileClick = (e) => {
    setShowDropDownProfile(e.currentTarget);
  }

  const handleProfileClick = (e) => {
    setShowDropDownProfile(null);
  }

  const adminClick = () => {
    navigate('/admin');
  }

  const testingClick = () => {
    navigate('/test');
  }
    

  return (<>
    <div style={{
      ...props.style,
      position: "absolute",
      overflow: "hidden",
      background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)", 
      WebkitBackdropFilter: "blur(12px)",
      height: "clamp(50px, 6vh, 64px)",
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
        <Typography onClick={() => logoClick()} style={{cursor: "pointer", marginLeft: "10px", letterSpacing: "4px"}} variant="h5" component="div" sx={{ color: "white", padding: "16px" }}>
          FAIS
        </Typography>
        <Button onClick={() => adminClick()} sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          admin
        </Button>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button onClick={() => matcherClick()} sx={{fontSize: "16px", marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Matcher
        </Button>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button onClick={() => competitionsClick()} sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Tävlingar
        </Button>
        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        <Button onClick={() => testingClick()} sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Testing
        </Button>
        {/* <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />

        <Button onClick={() => adminClick()} sx={{fontSize: "16px",marginLeft: "10px", color: "white", transition: "transform 200ms ease", "&:hover": {transform: 'scale(1.1)'}}}>
          Admin
        </Button> */}

        {/* mitten */}


        {/* HÖGRA SIDAN */}
        <IconButton onClick={() => notificationsClick()} size="large"
         sx={{alignSelf: "right", color: "white", marginLeft: "auto" }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
          </Badge>
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{alignSelf: "center", height: "50%", bgcolor: "rgb(255, 255, 255, 0.5)", mx: 2 }} />
        {isAuthenticated ?  <> <Button onClick={(e) => profileClick(e)} style={{color: "white", marginRight: "10px"}}>
          <KeyboardArrowDownIcon sx={{ color: "white" }}/>

          <Typography 
          variant="h6" component="div" sx={{ color: "white", padding: "16px 2px 16px 2px"  }}
          >
            Huskvarna IF
          </Typography>
          <Avatar src={eif} sx={{ width: 32, height: 32, marginLeft: "8px" }}>
          
          </Avatar>
          
        </Button>
         <Menu
            id="basic-menu"
            disableScrollLock={true}

            anchorEl={ShowDropDownProfile}
            open={Boolean(ShowDropDownProfile)}
            onClick={handleProfileClick}
            onClose={(e) => setShowDropDownProfile(null)}
            style={{color: "green"}}
            slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                bgcolor: "black",
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <MenuItem >Profile</MenuItem>
            <MenuItem >Settings</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu> </> : <> <Button onClick={(e) => profileClick(e)} style={{color: "white", marginRight: "10px"}}>

          <Typography 
          variant="h6" component="div" sx={{ color: "white", padding: "16px 2px 16px 2px"  }}
          >
            Utloggad
          </Typography>
          <Avatar sx={{ width: 32, height: 32, marginLeft: "8px" }}>
          
          </Avatar>
          
        </Button></>}
      </div>
    </div>
    <div style={{height: "92px"}}></div>
    </>
  );

}

export default NavBar