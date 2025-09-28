import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import '@fontsource/roboto/500.css';

const HomePage = () => {
  return (
    <div style={{backgroundColor: "#FFFFFF",
     overflow: "hidden",
      fontFamily: 'Roboto, sans-serif' }}>
      <NavBar/>
      <Button onClick={() => toast.success("Congrats unc", {
        style: { fontFamily: 'Roboto, sans-serif' }
      })}>
        do not click me
      </Button>
    </div>
  )
}

export default HomePage;