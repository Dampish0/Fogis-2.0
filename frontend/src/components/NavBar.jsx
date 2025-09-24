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
import clublogo from '../assets/hff.jpg'
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import '../index.css'




function NavBar() {
  return (
    <div className='NavBar'>
      <img src={clublogo} alt="clublogo" />
      <div className='icons'>
      <HomeIcon className= "icon"style={{fontSize : "250%", cursor : "pointer"}}/> 
      <SportsSoccerIcon className="icon" style={{fontSize : "250%", cursor : "pointer"}} /> 
      <EmojiEventsIcon className="icon" style={{fontSize : "250%", cursor : "pointer"}}/> 
      </div>

    </div>
  );
}

export default NavBar
