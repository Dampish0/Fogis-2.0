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
import clublogo from '../../assets/hff.jpg'
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './navbar.css'





function NavBar() {
  return (
    <div className='NavBar'>
       <img src={clublogo} alt="clublogo" />
       <h1 className="clubname">Husqvarna FF</h1>
      <div className='icons'>
        <div className='title'>
      <HomeIcon className= "icon" style={{fontSize : "150%", cursor : "pointer" }}/> 
        <p>Hem</p>
        </div>
         <div className='title'>
      <SportsSoccerIcon className="icon" style={{fontSize : "150%", cursor : "pointer"}}/> 
        <p>Matcher</p>
        </div>
        <div className='title'>
      <EmojiEventsIcon className="icon" style={{fontSize : "150%", cursor : "pointer"}}/> 
       <p>Tävlingar</p>
        </div>
       </div>

    </div>
  );
}

export default NavBar
